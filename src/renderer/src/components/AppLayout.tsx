import { ComponentProps, forwardRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { HideSidebarButton } from './Button/HideSidebarButton'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  const [opened, setOpened] = useState(true)

  return (
    <aside
      className={twMerge(
        'w-[250px] mt-10 h-[100vh + 10] overflow-auto duration-500',
        className,
        `${opened === true ? '' : 'ml-[-250px]'}`
      )}
      {...props}
    >
      {children}
      <HideSidebarButton
        isOpened={opened}
        onClick={() => setOpened(!opened)}
        className="absolute bottom-2 left-2"
      />
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
