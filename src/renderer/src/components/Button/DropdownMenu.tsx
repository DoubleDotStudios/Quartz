/* eslint-disable @typescript-eslint/no-explicit-any */
import { setTheme } from '@renderer/App'
import { useEffect, useRef, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaMountainSun } from 'react-icons/fa6'

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef: any = useRef(null)

  const themes = {
    Purples: {
      Amethyst: 'bg-amethyst text-default [&_a]:text-link_default',
      'Pink Lavender Dark':
        'bg-pink_lavender_dark text-text_pink_lavender_dark [&_a]:text-link_pink_lavender_dark',
      'Deep Amethyst': 'bg-deep_amethyst text-default [&_a]:text-link_default',
      'Deep Space': 'bg-deep_space text-default [&_a]:text-link_default',
      'Deep Obsidian': 'bg-deep_obsidian text-default [&_a]:text-link_default',
      Obsidian: 'bg-obsidian text-default [&_a]:text-link_default',
      Space: 'bg-space text-default [&_a]:text-link_default'
    },
    Blues: {
      'Cool Ocean': 'bg-cool_ocean text-default [&_a]:text-link_default',
      'Deep Marine': 'bg-deep_marine text-default [&_a]:text-link_default',
      'Warm Ocean': 'bg-warm_ocean text-default [&_a]:text-link_default'
    },
    Reds: {
      'Rose Quartz': 'bg-rose_quartz text-default [&_a]:text-link_default',
      'Scarlet Embers': 'bg-scarlet_embers text-default [&_a]:text-link_default'
    },
    Greens: {
      'Deep Forest': 'bg-deep_forest text-default [&_a]:text-link_default',
      Forest: 'bg-forest text-default [&_a]:text-link_default',
      Jade: 'bg-jade text-default [&_a]:text-link_default'
    },
    Pastel: {
      'Pastel Red': 'bg-aurora_red text-default [&_a]:text-link_default',
      'Pastel Orange': 'bg-aurora_orange text-default [&_a]:text-link_default',
      'Pastel Yellow': 'bg-aurora_yellow text-default [&_a]:text-link_default',
      'Pastel Green': 'bg-aurora_green text-default [&_a]:text-link_default',
      'Pastel Pink': 'bg-aurora_pink text-default [&_a]:text-link_default',
      'Pastel Blue': 'bg-nord_blue text-default [&_a]:text-link_default',
      'Pastel Black': 'bg-nord_night text-default [&_a]:text-link_default'
    },
    Catppuccin: {
      Latte: 'bg-latte text-text_latte [&_a]:text-link_latte',
      Frappe: 'bg-frappe text-text_frappe [&_a]:text-link_frappe',
      Macchiato: 'bg-macchiato text-text_macchiato [&_a]:text-link_macchiato',
      Mocha: 'bg-mocha text-text_mocha [&_a]:text-link_mocha'
    },
    Others: {
      Classic: 'bg-classic text-default [&_a]:text-link_default',
      'Deep Rustic': 'bg-deep_rustic text-default [&_a]:text-link_default',
      Rustic: 'bg-rustic text-default [&_a]:text-link_default'
    }
  }

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
    <Dropdown onClick={toggleDropdown} ref={dropdownRef} className="z-50">
      <Dropdown.Toggle
        id="Theme_Dropdown"
        className="px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100 flex justify-between mt-1"
      >
        <FaMountainSun className="w-4 h-4 text-zinc-300" />
      </Dropdown.Toggle>
      {isOpen && (
        <Dropdown.Menu
          className="container px-2 py-1 rounded-md border transition-colors duration-100 justify-between mt-1 bg-zinc-800 h-50 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(themes).map(([category, items]) => (
            <ul key={category}>
              <Dropdown.ItemText className="font-black">{category}</Dropdown.ItemText>
              <Dropdown.Divider />
              {Object.entries(items).map(([name, themeClass], index, array) => (
                <Dropdown.Item
                  className="cursor-pointer"
                  key={name}
                  onClick={() => setTheme(themeClass)}
                >
                  {name}
                  {index < array.length - 1 && ' | '}
                </Dropdown.Item>
              ))}
            </ul>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}
