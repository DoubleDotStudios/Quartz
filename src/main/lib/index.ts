/* eslint-disable prettier/prettier */
import { WelcomeNote, appDirectoryname, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import * as fs from "fs"
import { ensureDir, readFileSync, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import Welcome from '../../../resources/welcome.md?asset'

let NoteCount = 1;

export const getRootDir = () => {
    return `${homedir()}/${appDirectoryname}`
}

export const getFromSubDir = async (note: string) => {
    const rootDir = getRootDir()
    const list: string[] = [];

    if (fs.statSync(`${rootDir}/${note}`).isDirectory()) {
        for (const file of fs.readdirSync(`${rootDir}/${note}`)) {
            console.log(file)
            const dirNote = `${rootDir}/${note}`
            if (file.toLowerCase().includes("ds_store")) {
                continue;
            }
            else if (fs.statSync(`${dirNote}/${file}`).isDirectory()) {
                note = `${note}/${file}`
                getFromSubDir(note)
            }
            else {
                note = `${note}/${file}`
                list.push(note)
                console.log(list)
                return list
            }
        }
        return [];
    }
    else if (fs.statSync(`${rootDir}/${note}`).isFile()) {
        if (note.toLowerCase().includes("ds_store")) {
            return [];
        }
        list.push(note)
        return list;
    }
    else {
        return [];
    }
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    })

    const notes = notesFileNames.filter((fileName) =>
        fileName.endsWith('.rtf') ||
        fileName.endsWith('.md') ||
        fileName.endsWith('.txt') ||
        fileName.endsWith('')
    )

    let noteList: string[] = [];

    for (const note of notes) {
        if (note.endsWith(".DS_Store")) {
            continue;
        }
        if (fs.statSync(`${rootDir}/${note}`).isDirectory()) {
            for (const file of fs.readdirSync(`${rootDir}/${note}`)) {
                noteList = noteList.concat(await getFromSubDir(note + "/" + file))
            }
        }
        else {
            noteList.push(note)
        }
    }

    if (isEmpty(noteList)) {
        console.info('No notes found, creating a welcome note.')

        const content = await readFileSync(Welcome, { encoding: fileEncoding })

        await writeFile(`${rootDir}/${WelcomeNote}`, content, { encoding: fileEncoding })

        noteList.push(WelcomeNote)
    }

    return Promise.all(noteList.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${filename}`)

    return {
        title: filename,
        lastEditTime: fileStats.mtimeMs
    }
}

export const readNote: ReadNote = async (filename) => {
    const rootDir = getRootDir()

    console.info(`Reading note ${filename}`)
    let extension = filename.split('.')[1] // md, rtf, txt or undefined
    filename = await filename.replace(/\.rtf$/, '')
    filename = await filename.replace(/\.txt$/, '')
    filename = await filename.replace(/\.md$/, '')

    if (extension == undefined) {
        extension = "" // undefined = ""
    }
    else {
        extension = "." + extension
    }

    console.log(filename + extension)

    return readFileSync(`${rootDir}/${filename}` + extension, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDir = getRootDir()

    console.info(`Writing note ${filename}`)
    return writeFile(`${rootDir}/${filename}`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: `New Note`,
        defaultPath: `${rootDir}/Untitled${NoteCount++}`,
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
    }
    )

    if (canceled || !filePath) {
        console.info('Note creation cancelled.')
        return false
    }

    // const { name: filename, dir: parentDir } = path.parse(filePath)

    // if (parentDir !== rootDir) {
    //     await dialog.showMessageBox({
    //         type: 'error',
    //         title: 'Creation failed.',
    //         message: `All notes must be save under ${rootDir}.`
    //     })

    //     return false
    // }

    console.info(`Creating note: ${filePath}`)
    await writeFile(filePath, '')

    return filePath.replace(rootDir, "").replace(`/`, "")
}

export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getRootDir()

    let extension = filename.split('.')[1] // md, rtf, txt or undefined
    filename = await filename.replace(/\.rtf$/, '')
    filename = await filename.replace(/\.txt$/, '')
    filename = await filename.replace(/\.md$/, '')
    console.log(filename + extension)

    if (extension == undefined) {
        extension = "" // undefined = ""
    }
    else {
        extension = "." + extension
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
    await remove(`${rootDir}/${filename}` + extension)
    return true
}