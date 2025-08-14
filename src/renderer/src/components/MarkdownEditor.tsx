import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <div className="flex-1 overflow-y-auto bg-white/40 dark:bg-zinc-900/40 border-l border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg backdrop-blur-md p-4 mx-4 my-6">
      <MDXEditor
        ref={editorRef}
        key={selectedNote.title}
        markdown={selectedNote.content}
        onChange={handleAutoSaving}
        onBlur={handleBlur}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin()
        ]}
        contentEditableClassName={`
          outline-none min-h-[60vh] max-w-4xl mx-auto px-8 py-6
          text-base md:text-lg
          caret-yellow-500
          prose dark:prose-invert
          prose-p:my-3 prose-p:leading-relaxed
          prose-headings:my-4
          prose-blockquote:my-4
          prose-ul:my-2 prose-li:my-0
          prose-code:px-1 prose-code:rounded-sm prose-code:text-pink-600
          prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800
          prose-code:before:content-[''] prose-code:after:content-['']
        `}
      />
    </div>
  )
}
