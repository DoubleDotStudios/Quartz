import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  MD,
  MDT,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef, useState } from 'react'

const storeVal = (value, item: string) => {
  localStorage.setItem(item, JSON.stringify(value))
}

const getVal = () => {
  const val = JSON.stringify(localStorage.getItem('theme'))
  let style = val.replace('"\\"', '')
  style = style.replace('\\""', '')
  return style
}

export const reload = () => {
  window.location.reload()
}

export const setTheme = (style: string) => {
  storeVal(style, 'theme')
  reload()
}

const App = () => {
  const [text, setText] = useState('')

  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  const content: string = 'border-l bg-zinc-900/50 border-l-white/20'
  let opacity: string = 'hover:opacity-75 opacity-60 transition colours duration-500 '

  if (window.navigator.platform.indexOf('Win') != -1) {
    opacity = ''
  }

  const theme: string =
    opacity +
    (getVal() == null || undefined
      ? 'bg-classic text-text_default [&_a]:text-link_default'
      : getVal())

  return (
    <div className={theme}>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className={content}>
          <FloatingNoteTitle className="pt-2 backdrop-blur-lg sticky top-0" />
          <MD />
        </Content>
      </RootLayout>
    </div>
  )
}

export default App
