import { Sparkle } from "lucide-react";

export const DraggableTopBar = () => {
  return (
    <header
      className="
        absolute inset-x-0 top-0 h-14 z-50
        flex items-center justify-center
        bg-gradient-to-r from-white/30 via-purple-100/40 to-cyan-100/30 dark:from-slate-900/40 dark:via-purple-900/30 dark:to-cyan-900/30
        backdrop-blur-2xl
        border-b border-transparent
        shadow-lg
        select-none
        px-8
        transition-all duration-300
      "
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left-side branding icon */}
      <div className="absolute left-6 flex items-center">
        <Sparkle className="w-6 h-6 text-purple-400 animate-spin-slow drop-shadow-lg" />
      </div>

      {/* Centered app name with glow */}
      <span className="mx-auto text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 drop-shadow-lg animate-fadeIn">
        JotAra
      </span>

      {/* Animated bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 animate-slideIn"></div>
    </header>
  );
};