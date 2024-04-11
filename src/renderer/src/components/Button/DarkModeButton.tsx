import { theme } from '@shared/themes'
import { ImSun } from 'react-icons/im'
import { PiMoonFill } from 'react-icons/pi'
import { ActionButton, ActionButtonProps } from './ActionButton'

export const DarkModeButton = ({ ...props }: ActionButtonProps) => {
  const handleTheme = () => {
    theme === 'light' ? 'dark' : 'light'
    console.log(theme)
  }

  return (
    <ActionButton {...props} onClick={handleTheme}>
      <ImSun className="w-4 h-4 text-zinc-300 dark:opacity-100 opacity-0" />
      <PiMoonFill className="w-4 h-4 text-zinc-300 dark:opacity-0 opacity-100" />
    </ActionButton>
  )
}
