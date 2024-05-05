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
            <Dropdown.Item onClick={() => setTheme('amethyst')}> Amethyst </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('dark_frequencies')}>
              | Dark Frequencies
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('deep_amethyst')}>
              {' '}
              | Deep Amethyst |
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('deep_space')}> Deep Space |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('deep_obsidian')}>
              {' '}
              Deep Obsidian |
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('obsidian')}> Obsidian | </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('space')}> Space</Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Blues</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setTheme('cool_ocean')}>Cool Ocean |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('deep_marine')}> Deep Marine |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('warm_ocean')}> Warm Ocean</Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Reds</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setTheme('rose_quartz')}>Rose Quartz |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('scarlet_embers')}>
              {' '}
              Scarlet Embers
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Greens</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setTheme('deep_forest')}>Deep Forest |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('forest')}> Forest |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('jade')}> Jade</Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Others</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setTheme('')}>Classic |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('deep_rustic')}> Deep Rustic |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('rustic')}> Rustic</Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Solarized</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setTheme('solarized_dark')}>
              Solarized Dark |
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('solarized_light')}>
              {' '}
              Solarized Light
            </Dropdown.Item>
          </ul>
          <ul>
            <Dropdown.ItemText className="font-black">Nord</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setTheme('aurora_red')}>Aurora Red |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('aurora_orange')}>
              {' '}
              Aurora Orange |
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('aurora_yellow')}>
              {' '}
              Aurora Yellow |
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('aurora_green')}> Aurora Green |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('aurora_pink')}> Aurora Pink |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('nord_blue')}> Frost Blue |</Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme('nord_night')}> Polar Night</Dropdown.Item>
          </ul>
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}
