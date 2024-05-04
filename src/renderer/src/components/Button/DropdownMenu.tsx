import { setTheme } from '@renderer/App'
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaMountainSun } from 'react-icons/fa6'

export let style: string

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Dropdown onClick={toggleDropdown}>
      <Dropdown.Toggle
        id="Theme_Dropdown"
        className="px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100 flex justify-between mt-1"
      >
        <FaMountainSun className="w-4 h-4 text-zinc-300" />
      </Dropdown.Toggle>
      {isOpen && (
        <Dropdown.Menu className="px-2 py-1 rounded-md border transition-colors duration-100 flex justify-between mt-1 bg-zinc-800 flex-col">
          <Dropdown.Item onClick={() => setTheme('')}>Classic</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setTheme('amethyst')}>Amethyst</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('obsidian')}>Obsidian</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('rustic')}>Rustic</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('dark_frequencies')}>
            Dark Frequencies
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('rose_quartz')}>Rose Quartz</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('deep_forest')}>Deep Forest</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('deep_space')}>Deep Space</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}
