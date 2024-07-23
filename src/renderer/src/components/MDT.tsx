import { useState } from 'react'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { TextareaAutosize } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export const MDT = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()
  const [text, setText] = useState(selectedNote?.content)

  if (!selectedNote) return null

  return (
    <div className="overflow-hidden">
      <TextareaAutosize
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent caret-yellow-500 outline-none resize-none w-full h-full text-lg z-10 monospace"
      />
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        className="text-lg md select-text"
        components={{
          a(props) {
            const { node, ...rest } = props
            return <a target="_blank" {...rest} />
          },
          code(props) {
            const { children, className, node, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={dark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {text}
      </Markdown>
    </div>
  )
}
