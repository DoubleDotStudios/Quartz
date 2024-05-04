/* eslint-disable prettier/prettier */
import { WelcomeNote, appDirectoryname, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import Welcome from '../../../resources/welcome.md?asset'

let NoteCount = 1

export const getRootDir = () => {
    return path.join(homedir(), appDirectoryname)
}

export const getFromSubDir = async (note: string): Promise<string[]> => {
    const rootDir = getRootDir()
    const list: string[] = []

    const fullPath = path.join(rootDir, note)

    try {
        const stats = await stat(fullPath)

        if (stats.isDirectory()) {
            const files = await readdir(fullPath)

            for (const file of files) {
                if (file.toLowerCase().includes('ds_store')) {
                    continue
                }

                const filePath = path.join(fullPath, file)

                if ((await stat(filePath)).isDirectory()) {
                    const subList = await getFromSubDir(path.join(note, file))
                    list.push(...subList)
                } else {
                    list.push(path.join(note, file))
                }
            }
        } else if (stats.isFile()) {
            list.push(note)
        }
    } catch (error) {
        console.error(`Error while reading ${fullPath}: ${error}`)
    }

    return list
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    });

    const notes = notesFileNames.filter((fileName) =>
        fileName.endsWith('.rtf') ||
        fileName.endsWith('.md') ||
        fileName.endsWith('.txt') ||
        fileName.lastIndexOf('.') === -1
    );

    let noteList: string[] = [];

    for (const note of notes) {
        if (note.endsWith('.DS_Store')) {
            continue;
        }
        if ((await stat(path.join(rootDir, note))).isDirectory()) {
            for (const file of await readdir(path.join(rootDir, note))) {
                noteList = noteList.concat(await getFromSubDir(path.join(note, file)));
            }
        } else {
            noteList.push(note);
        }
    }

    if (isEmpty(noteList)) {
        console.info('No notes found, creating a welcome note.');

        const content = await readFile(Welcome, { encoding: fileEncoding });

        await writeFile(path.join(rootDir, WelcomeNote), content, { encoding: fileEncoding });

        noteList.push(WelcomeNote);
    }

    return Promise.all(noteList.map(getNoteInfoFromFilename));
};

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(path.join(getRootDir(), filename))

    return {
        title: filename,
        lastEditTime: fileStats.mtimeMs
    }
}

export const readNote: ReadNote = async (filename) => {
    const rootDir = getRootDir()

    console.info(`Reading note ${filename}`)
    let extension = filename.split('.')[1] // md, rtf, txt or undefined
    filename = filename.replace(/\.rtf$/, '')
    filename = filename.replace(/\.txt$/, '')
    filename = filename.replace(/\.md$/, '')

    if (extension == undefined) {
        extension = '' // undefined = ""
    } else {
        extension = '.' + extension
    }

    console.log(filename + extension)

    return readFile(path.join(rootDir, filename) + extension, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDir = getRootDir()

    console.info(`Writing note ${filename}`)
    return writeFile(path.join(rootDir, filename), content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: `New Note`,
        defaultPath: path.join(rootDir, `Untitled${NoteCount++}`),
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false
    })

    const ext = filePath?.split(".")[1]
    if (ext != undefined && ext != "rtf" && ext != "md" && ext != "txt") {
        dialog.showMessageBox({
            type: 'error',
            title: 'Invalid File Format',
            message: `"${ext}" file format is unsupported.`,
            buttons: ['Ok'],
            defaultId: 1,
            cancelId: 1
        })
        return false
    }

    if (canceled || !filePath) {
        console.info('Note creation cancelled.')
        return false
    }

    console.info(`Creating note: ${filePath}`)
    await writeFile(filePath, '')

    return filePath.replace(rootDir, '').replace(path.sep, '')
}

export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getRootDir()

    let extension = filename.split('.')[1] // md, rtf, txt or undefined
    filename = filename.replace(/\.rtf$/, '')
    filename = filename.replace(/\.txt$/, '')
    filename = filename.replace(/\.md$/, '')

    console.log(filename + extension)

    if (extension == undefined) {
        extension = '' // undefined = ""
    } else {
        extension = '.' + extension
    }

    console.log(filename + extension)

    const { response } = await dialog.showMessageBox({
        type: 'warning',
        title: 'Delete Note',
        message: `Are you sure you want to delete ${filename}?`,
        buttons: ['Delete', 'Cancel'],
        defaultId: 1,
        cancelId: 1
    })

    if (response === 1) {
        console.info('Note deletion cancelled.')
        return false
    }

    console.info(`Deleting note: ${filename}.`)
    await remove(path.join(rootDir, filename) + extension)
    return true
}
