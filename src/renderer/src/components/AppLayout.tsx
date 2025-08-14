import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main 
      className={twMerge(
        'flex flex-row h-screen overflow-hidden relative',
        'bg-gradient-to-br from-indigo-50/80 via-white/40 to-cyan-50/80',
        'dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/40 dark:to-slate-900/80',
        'backdrop-blur-3xl',
        className
      )} 
      {...props}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='47' cy='13' r='1'/%3E%3Ccircle cx='23' cy='41' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="relative z-10 flex flex-row w-full h-full">
        {children}
      </div>
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge(
        'relative',
        'w-[280px] h-full flex flex-col', // Remove max-h-min, add h-full
        'bg-white/10 dark:bg-black/10',
        'backdrop-blur-xl',
        'border-r border-white/20 dark:border-white/10',
        'shadow-xl shadow-black/5 dark:shadow-black/20',
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-hidden flex flex-col">
        {children}
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent pointer-events-none"></div>
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={twMerge(
        'flex-1 flex flex-col relative overflow-auto', // Use overflow-auto for scroll
        'bg-white/10 dark:bg-black/10', // Slightly more visible glass effect
        'backdrop-blur-md',
        'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-700', // Custom scrollbar
        className
      )} 
      {...props}
    >
      {/* Subtle gradient overlay, pointer-events-none removed for scroll accessibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-white/5 dark:via-transparent dark:to-white/2"></div>
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </div>
  )
)

Content.displayName = 'Content'