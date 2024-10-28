import { ActionButton, ActionButtonProps } from '@/components'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

interface HideSidebarButtonProps extends ActionButtonProps {
  isOpened: boolean;
}

export const HideSidebarButton = ({ isOpened, ...props }: HideSidebarButtonProps) => {
  return (
    <ActionButton {...props} className="absolute bottom-2 left-2">
      {isOpened ? (
        <FaArrowLeft title="Hide Sidebar" className="w-4 h-4 text-zinc-300" />
      ) : (
        <FaArrowRight title="Show Sidebar" className="w-4 h-4 text-zinc-300" />
      )}
    </ActionButton>
  )
}
