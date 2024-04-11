import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaRegFileAlt } from 'react-icons/fa'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handelCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handelCreation}>
      <FaRegFileAlt className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
