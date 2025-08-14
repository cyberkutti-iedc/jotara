import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton
      onClick={handleCreation}
      className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white shadow-lg rounded-xl px-3 py-2 transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-center"
      {...props}
    >
      <LuFileSignature className="w-5 h-5 text-white drop-shadow animate-pulse" />
      <span className="ml-2 font-semibold text-sm hidden md:inline">New Note</span>
    </ActionButton>
  )
}
