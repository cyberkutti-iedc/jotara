import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div
      className={twMerge(
        'sticky top-12 z-40 w-full',
        'bg-white/20 dark:bg-black/20',
        'backdrop-blur-md',
        'border-b border-white/15 dark:border-white/10',
        'shadow-md',
        'px-6 py-3',
        'flex justify-center items-center relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center space-x-3 max-w-full">
        {/* File icon - minimal */}
        <div className="flex-shrink-0">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-white/15 dark:border-white/10 flex items-center justify-center">
            <svg className="w-3 h-3 text-slate-500 dark:text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Title with soft shadow */}
        <div className="flex-1 min-w-0">
          <span className="text-base font-bold text-slate-800 dark:text-slate-100 truncate block drop-shadow-sm">
            {selectedNote.title}
          </span>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-500/40 to-transparent mt-1"></div>
        </div>

        {/* Status indicator - minimal */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm"></div>
          <span className="text-xs text-slate-500 dark:text-slate-400">saved</span>
        </div>
      </div>

      {/* Thin underline accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>
    </div>
  )
}