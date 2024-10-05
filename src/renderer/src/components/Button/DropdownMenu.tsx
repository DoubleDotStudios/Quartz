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
          <ul>
            <Dropdown.ItemText className="font-black">Purples</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-amethyst text-default [&_a]:text-link_default')}
            >
              {' '}
              Amethyst{' '}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setTheme(
                  'bg-pink_lavender_dark text-text_pink_lavender_dark [&_a]:text-link_pink_lavender_dark'
                )
              }
            >
              | Pink Lavender Dark
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-deep_amethyst text-default [&_a]:text-link_default')}
            >
              {' '}
              | Deep Amethyst |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-deep_space text-default [&_a]:text-link_default')}
            >
              {' '}
              Deep Space |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-deep_obsidian text-default [&_a]:text-link_default')}
            >
              {' '}
              Deep Obsidian |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-obsidian text-default [&_a]:text-link_default')}
            >
              {' '}
              Obsidian |{' '}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-space text-default [&_a]:text-link_default')}
            >
              {' '}
              Space
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Blues</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-cool_ocean text-default [&_a]:text-link_default')}
            >
              Cool Ocean |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-deep_marine text-default [&_a]:text-link_default')}
            >
              {' '}
              Deep Marine |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-warm_ocean text-default [&_a]:text-link_default')}
            >
              {' '}
              Warm Ocean
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Reds</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-rose_quartz text-default [&_a]:text-link_default')}
            >
              Rose Quartz |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-scarlet_embers text-default [&_a]:text-link_default')}
            >
              {' '}
              Scarlet Embers
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Greens</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-deep_forest text-default [&_a]:text-link_default')}
            >
              Deep Forest |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-forest text-default [&_a]:text-link_default')}
            >
              {' '}
              Forest |
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('bg-jade text-default [&_a]:text-link_default')}>
              {' '}
              Jade
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Pastel</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-aurora_red text-default [&_a]:text-link_default')}
            >
              Pastel Red |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-aurora_orange text-default [&_a]:text-link_default')}
            >
              {' '}
              Pastel Orange |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-aurora_yellow text-default [&_a]:text-link_default')}
            >
              {' '}
              Pastel Yellow |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-aurora_green text-default [&_a]:text-link_default')}
            >
              {' '}
              Pastel Green |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-aurora_pink text-default [&_a]:text-link_default')}
            >
              {' '}
              Pastel Pink |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-nord_blue text-default [&_a]:text-link_default')}
            >
              {' '}
              Pastel Blue |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-nord_night text-default [&_a]:text-link_default')}
            >
              {' '}
              Pastel Black
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Catppuccin</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-latte text-text_latte [&_a]:text-link_latte')}
            >
              Latte |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-frappe text-text_frappe [&_a]:text-link_frappe')}
            >
              {' '}
              Frappe |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-macchiato text-text_macchiato [&_a]:text-link_macchiato')}
            >
              {' '}
              Macchiato |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-mocha text-text_mocha [&_a]:text-link_mocha')}
            >
              {' '}
              Mocha
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Others</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => setTheme('bg-classic text-default [&_a]:text-link_default')}
            >
              Classic |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-deep_rustic text-default [&_a]:text-link_default')}
            >
              {' '}
              Deep Rustic |
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTheme('bg-rustic text-default [&_a]:text-link_default')}
            >
              {' '}
              Rustic
            </Dropdown.Item>
          </ul>
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}
