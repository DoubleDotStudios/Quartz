import { notesAtom, selectedNoteIndexAtom } from '@renderer/store'
import { seed } from '@shared/constants'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)
    if (onSelect) {
      onSelect()
    }
    seed.val = Math.random()
    console.log(seed.val)
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
