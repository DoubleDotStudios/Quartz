import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaPlus } from 'react-icons/fa'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handelCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handelCreation}>
      <FaPlus className="w-6 h-6" />
    </ActionButton>
  )
}
