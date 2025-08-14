import { ActionButton, ActionButtonProps } from '@/components'
import { deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaRegTrashCan } from 'react-icons/fa6'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton
      onClick={handleDelete}
      className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white shadow-md rounded-lg px-2 py-1 ml-2 mt-1 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-center"
      {...props}
    >
      <FaRegTrashCan className="w-4 h-4 text-white drop-shadow animate-bounce" />
      <span className="ml-1 font-medium text-xs hidden md:inline">Delete</span>
    </ActionButton>
  )
}
