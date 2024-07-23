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
  let style: string
  style = val.replace('"\\"', '')
  style = style.replace('\\""', '')
  return style
}

const reload = () => {
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

  let theme = ''
  const content = 'border-l bg-zinc-900/50 border-l-white/20'
  let opacity = 'hover:opacity-75 opacity-60 transition colours duration-500 '

  if (window.navigator.platform.indexOf('Win') != -1) {
    opacity = ''
  }

  const style = getVal().toString()
  switch (style) {
    case 'obsidian':
      theme = opacity + 'bg-obsidian' + ' text-zinc-50'
      break
    case 'amethyst':
      theme = opacity + 'bg-amethyst' + ' text-zinc-50'
      break
    case 'rustic':
      theme = opacity + 'bg-rustic' + ' text-zinc-50'
      break
    case 'dark_frequencies':
      theme = opacity + 'bg-dark_frequencies' + ' text-zinc-50'
      break
    case 'rose_quartz':
      theme = opacity + 'bg-rose_quartz' + ' text-zinc-50'
      break
    case 'deep_forest':
      theme = opacity + 'bg-deep_forest' + ' text-zinc-50'
      break
    case 'deep_space':
      theme = opacity + 'bg-deep_space' + ' text-zinc-50'
      break
    case 'cool_ocean':
      theme = opacity + 'bg-cool_ocean' + ' text-zinc-50'
      break
    case 'warm_ocean':
      theme = opacity + 'bg-warm_ocean' + ' text-zinc-50'
      break
    case 'scarlet_embers':
      theme = opacity + 'bg-scarlet_embers' + ' text-zinc-50'
      break
    case 'deep_amethyst':
      theme = opacity + 'bg-deep_amethyst' + ' text-zinc-50'
      break
    case 'space':
      theme = opacity + 'bg-space' + ' text-zinc-50'
      break
    case 'deep_rustic':
      theme = opacity + 'bg-deep_rustic' + ' text-zinc-50'
      break
    case 'forest':
      theme = opacity + 'bg-forest' + ' text-zinc-50'
      break
    case 'deep_marine':
      theme = opacity + 'bg-deep_marine' + ' text-zinc-50'
      break
    case 'deep_obsidian':
      theme = opacity + 'bg-deep_obsidian' + ' text-zinc-50'
      break
    case 'jade':
      theme = opacity + 'bg-jade' + ' text-zinc-50'
      break
    case 'aurora_red':
      theme = opacity + 'bg-aurora_red' + ' text-zinc-50'
      break
    case 'aurora_orange':
      theme = opacity + 'bg-aurora_orange' + ' text-zinc-50'
      break
    case 'aurora_yellow':
      theme = opacity + 'bg-aurora_yellow' + ' text-zinc-50'
      break
    case 'aurora_green':
      theme = opacity + 'bg-aurora_green' + ' text-zinc-50'
      break
    case 'aurora_pink':
      theme = opacity + 'bg-aurora_pink' + ' text-zinc-50'
      break
    case 'nord_blue':
      theme = opacity + 'bg-nord_blue' + ' text-zinc-50'
      break
    case 'nord_night':
      theme = opacity + 'bg-nord_night' + ' text-zinc-50'
      break
    default:
      theme = opacity + 'bg-classic' + ' text-zinc-50'
  }

  return (
    <div className={theme}>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className={content}>
          <FloatingNoteTitle className="pt-2 sticky top-0" />
          <MD />
        </Content>
      </RootLayout>
    </div>
  )
}

export default App
