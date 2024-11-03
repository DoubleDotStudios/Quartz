/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaMountainSun } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import useOutsideClick from '@/hooks/useOutsideClick'
import { twMerge } from 'tailwind-merge'

interface DropdownItem {
  id: string
  name: string
  theme: string
}

interface DropdownProps {
  id: string
  title?: string
  data: DropdownItem[]
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  hasImage?: boolean
  style?: string
  selectedId?: string
  onSelect?: (id: string) => void
}

export const DropdownMenu = ({
  id,
  data,
  position = 'bottom-left',
  style,
  selectedId,
  onSelect
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  )

  const handleChange = (item: DropdownItem) => {
    if (item.name.includes('%')) return
    setSelectedItem(item)
    onSelect && onSelect(item.id)
    setIsOpen(false)
  }

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId)
      newSelectedItem && setSelectedItem(newSelectedItem)
    } else {
      setSelectedItem(undefined)
    }
  }, [selectedId, data])

  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false)
  })

  const dropdownClass = classNames(
    'absolute bg-zinc-700 w-60 max-h-64 overflow-y-auto py-3 rounded-md shadow-md z-10 no-scrollbar',
    {
      'top-full right-0 mt-2': position === 'bottom-right',
      'top-full left-0 mt-2': position === 'bottom-left',
      'bottom-full right-0 mb-2': position === 'top-right',
      'bottom-full left-0 mb-2': position === 'top-left'
    }
  )

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          'px-2 py-1 rounded-md border-2 border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
          style
        )}
      >
        <FaMountainSun className="w-6 h-6" />
      </button>
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical" className="leading-10">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames('flex items-center px-3', {
                  'bg-zinc-500': selectedItem?.id === item.id,
                  'hover:bg-zinc-600': !item.name.includes('%')
                })}
              >
                {item.name.includes('%') ? (
                  <>
                    <hr className="w-full clear-both" />
                    <span className="text-xl font-black">{item.name.replace('%', '')}</span>
                    <hr className="w-full clear-both" />
                  </>
                ) : (
                  <span>{item.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
