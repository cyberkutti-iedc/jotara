import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // save on disk
  await window.context.writeNote(selectedNote.title, newContent)

  // update the saved note's last edit time
  set(
    notesAtom,
    notes.map((note) => {
      // this is the note that we want to update
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }

      return note
    })
  )
})

// Utility for showing feedback
function showToast(message: string, type: 'success' | 'error' = 'success') {
  if (window?.Notification && Notification.permission === 'granted') {
    new Notification(type === 'success' ? 'Success' : 'Error', { body: message })
  } else {
    // fallback: alert (can be replaced with a custom toast component)
    alert(message)
  }
}

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.context.createNote()

  if (!title) {
    showToast('Note creation canceled or failed.', 'error')
    return
  }

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0)
  showToast('Note created successfully!', 'success')
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)

  if (!isDeleted) {
    showToast('Note deletion canceled or failed.', 'error')
    return
  }

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )
  set(selectedNoteIndexAtom, null)
  showToast('Note deleted successfully!', 'success')
})
