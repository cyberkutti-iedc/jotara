import { NotePreview } from '@/components'
import { useNotesList } from '@/hooks/useNotesList'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (!notes) return null

  const mergedClassName = twMerge(
    'flex flex-col gap-3 p-4 overflow-y-auto scrollbar-hidden',
    'bg-gradient-to-b from-transparent via-white/5 to-transparent',
    className
  )

  if (isEmpty(notes)) {
    return (
      <ul className={mergedClassName} {...props}>
        <li className="flex flex-col items-center justify-center py-12 px-6 text-center">
          {/* Empty state illustration */}
          <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20 dark:border-white/10">
            <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No notes yet
          </h3>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            Create your first note to get started with your markdown journey
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center space-x-2 mt-6 opacity-30">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            <div className="w-1 h-1 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
          </div>
        </li>
      </ul>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Notes
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 bg-white/10 dark:bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm">
            {notes.length}
          </span>
        </div>
      </div>

      {/* Notes list */}
      <ul className={mergedClassName} {...props}>
        {notes.map((note, index) => (
          <li key={note.title + note.lastEditTime} className="transform transition-all duration-200">
            <NotePreview
              {...note}
              isActive={selectedNoteIndex === index}
              onClick={handleNoteSelect(index)}
            />
          </li>
        ))}
        
        {/* Bottom spacer for better scrolling */}
        <li className="h-4"></li>
      </ul>
    </div>
  )
}