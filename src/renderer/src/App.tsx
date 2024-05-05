import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

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
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  let theme = ''

  const opacity = 'hover:opacity-75 opacity-60 transition colours duration-500 '

  const style = getVal().toString()
  switch (style) {
    case 'obsidian':
      theme = opacity + 'bg-obsidian'
      break
    case 'amethyst':
      theme = opacity + 'bg-amethyst'
      break
    case 'rustic':
      theme = opacity + 'bg-rustic'
      break
    case 'dark_frequencies':
      theme = opacity + 'bg-dark_frequencies'
      break
    case 'rose_quartz':
      theme = opacity + 'bg-rose_quartz'
      break
    case 'deep_forest':
      theme = opacity + 'bg-deep_forest'
      break
    case 'deep_space':
      theme = opacity + 'bg-deep_space'
      break
    case 'cool_ocean':
      theme = opacity + 'bg-cool_ocean'
      break
    case 'warm_ocean':
      theme = opacity + 'bg-warm_ocean'
      break
    case 'scarlet_embers':
      theme = opacity + 'bg-scarlet_embers'
      break
    case 'deep_amethyst':
      theme = opacity + 'bg-deep_amethyst'
      break
    case 'space':
      theme = opacity + 'bg-space'
      break
    case 'deep_rustic':
      theme = opacity + 'bg-deep_rustic'
      break
    case 'forest':
      theme = opacity + 'bg-forest'
      break
    case 'deep_marine':
      theme = opacity + 'bg-deep_marine'
      break
    case 'deep_obsidian':
      theme = opacity + 'bg-deep_obsidian'
      break
    case 'jade':
      theme = opacity + 'bg-jade'
      break
    case 'solarized_dark':
      theme = opacity + 'bg-solarized_dark'
      break
    case 'solarized_light':
      theme = opacity + 'text-zinc-600 ' + 'bg-solarized_light'
      break
    case 'aurora_red':
      theme = opacity + 'bg-aurora_red'
      break
    case 'aurora_orange':
      theme = opacity + 'bg-aurora_orange'
      break
    case 'aurora_yellow':
      theme = opacity + 'bg-aurora_yellow'
      break
    case 'aurora_green':
      theme = opacity + 'bg-aurora_green'
      break
    case 'aurora_pink':
      theme = opacity + 'bg-aurora_pink'
      break
    case 'nord_blue':
      theme = opacity + 'bg-nord_blue'
      break
    case 'nord_night':
      theme = opacity + 'bg-nord_night'
      break
    default:
      theme = ''
  }

  return (
    <div className={theme}>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </div>
  )
}

export default App
