import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

interface HideSidebarButtonProps extends ActionButtonProps {
  isOpened: boolean;
}

export const HideSidebarButton = ({ isOpened, ...props }: HideSidebarButtonProps) => {
  return (
    <ActionButton {...props}>
      {isOpened ? (
        <FaArrowLeft title="Hide Sidebar" className="w-4 h-4 text-zinc-300" />
      ) : (
        <FaArrowRight title="Show Sidebar" className="w-4 h-4 text-zinc-300" />
      )}
    </ActionButton>
  )
}
