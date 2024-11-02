import { DeleteNoteButton, DropdownMenu, NewNoteButton } from '@/components'
import { reload, setTheme } from '@renderer/App'
import { ComponentProps } from 'react'
import data from '@/store/themes.json'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  const handleSelect = (id: string) => {
    const theme = data[Number(id)]['theme'].toString()
    setTheme(theme)
  }

  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
      <DropdownMenu
        id="person"
        title="Select Person"
        data={data}
        hasImage
        onSelect={handleSelect}
      />
    </div>
  )
}
