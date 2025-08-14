import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps, useState } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const date = formatDateFromMs(lastEditTime)

  // Extract first few words of content for preview
  const contentPreview = content 
    ? content.replace(/[#*`\-\n]/g, '').slice(0, 80) + (content.length > 80 ? '...' : '')
    : 'No content yet...'


  return (
    <div
      className={cn(
        'cursor-pointer rounded-xl transition-all duration-200 relative overflow-hidden group',
        'backdrop-blur-sm border shadow-md hover:shadow-lg',
        'transform hover:scale-[1.01] hover:-translate-y-0.5',
        {
          // Active state - subtle glass effect
          'bg-white/20 dark:bg-white/10 border-indigo-300 dark:border-indigo-400': isActive,
          'shadow-indigo-300/20 dark:shadow-indigo-400/20': isActive,
          // Inactive state - subtle glass effect
          'bg-white/10 dark:bg-white/5': !isActive,
          'hover:bg-white/20 dark:hover:bg-white/10': !isActive,
          'border-white/20 dark:border-white/10': !isActive,
          'shadow-black/5 dark:shadow-black/10': !isActive,
        },
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-white/5 dark:via-transparent dark:to-white/2"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            {/* File type indicator */}
            <div className={cn(
              'w-2 h-2 rounded-full shadow-sm',
              {
                'bg-indigo-400 shadow-indigo-400/50': isActive,
                'bg-slate-400 dark:bg-slate-500': !isActive
              }
            )}></div>
            <h3 className={cn(
              'font-semibold truncate transition-colors duration-200',
              {
                'text-indigo-900 dark:text-indigo-100': isActive,
                'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100': !isActive
              }
            )}>
              {title}
            </h3>
          </div>
          {/* Minimal quick action button */}
          <button
            className={cn(
              'ml-2 px-2 py-1 rounded text-xs font-medium transition-all duration-150',
              'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800',
              'focus:outline-none focus:ring-2 focus:ring-indigo-400'
            )}
            title="Open Note"
            onClick={e => { e.stopPropagation(); /* handle open note */ }}
          >
            Open
          </button>
        </div>
        {/* Content preview */}
        <p className={cn(
          'text-xs leading-relaxed mb-3 transition-colors duration-200',
          {
            'text-indigo-700 dark:text-indigo-300': isActive,
            'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300': !isActive
          }
        )}>
          {contentPreview}
        </p>
        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={cn(
            'text-xs font-medium transition-colors duration-200',
            {
              'text-indigo-600 dark:text-indigo-400': isActive,
              'text-slate-500 dark:text-slate-400': !isActive
            }
          )}>
            {date}
          </span>
          {/* Word count or status */}
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {content ? `${content.split(' ').length} words` : 'Empty'}
          </span>
        </div>
      </div>
      {/* Bottom accent line */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-px transition-all duration-200',
        {
          'bg-indigo-400/60 dark:bg-indigo-400/40': isActive,
          'bg-gradient-to-r from-transparent via-slate-300/30 dark:via-slate-500/30 to-transparent opacity-0 group-hover:opacity-100': !isActive
        }
      )}></div>
    </div>
  )
}