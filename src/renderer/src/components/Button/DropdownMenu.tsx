/* eslint-disable @typescript-eslint/no-explicit-any */
import { setTheme } from '@renderer/App'
import { useEffect, useRef, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaMountainSun } from 'react-icons/fa6'

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef: any = useRef(null)

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside)

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []) // Empty dependency array ensures this effect runs only once

  return (
    <Dropdown onClick={toggleDropdown} ref={dropdownRef}>
      <Dropdown.Toggle
        id="Theme_Dropdown"
        className="px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100 flex justify-between mt-1"
      >
        <FaMountainSun className="w-4 h-4 text-zinc-300" />
      </Dropdown.Toggle>
      {isOpen && (
        <Dropdown.Menu
          className="px-2 py-1 rounded-md border transition-colors duration-100 flex justify-between mt-1 bg-zinc-800 flex-col"
          onClick={(e) => e.stopPropagation()}
        >
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
