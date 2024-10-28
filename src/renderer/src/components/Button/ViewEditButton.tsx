import { ActionButton, ActionButtonProps } from '@/components'
import { FaEdit, FaEye } from 'react-icons/fa'

interface ViewEditButtonProps extends ActionButtonProps {
  isEditing: boolean
}

export const ViewEditButton = ({ isEditing, ...props }: ViewEditButtonProps) => {
  return (
    <ActionButton {...props} className="absolute bottom-2 right-2">
      {isEditing ? (
        <FaEye title="View" className="w-4 h-4 text-zinc-300" />
      ) : (
        <FaEdit title="Edit" className="w-4 h-4 text-zinc-300" />
      )}
    </ActionButton>
  )
}
