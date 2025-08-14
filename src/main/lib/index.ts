import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import * as path from 'path'
// Use CommonJS globals for __dirname and __filename
// __dirname and __filename are available as globals in Node.js

// Path to the welcomeNote.md in resources
const welcomeNoteFile = path.join(__dirname, '../../../resources/welcomeNote.md')

// Get the root notes directory in user's home
export const getRootDir = () => path.join(homedir(), appDirectoryName)

// Read all .md notes or create a welcome note if none exist
export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const fileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = fileNames.filter((file) => file.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating welcome note...')
    try {
      const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })
      const welcomePath = path.join(rootDir, welcomeNoteFilename)
      await writeFile(welcomePath, content, { encoding: fileEncoding })
      notes.push(welcomeNoteFilename)
    } catch (err) {
      console.error('Failed to create welcome note:', err)
    }
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

// Extract info from a note file
export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const filePath = path.join(getRootDir(), filename)
  const fileStats = await stat(filePath)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

// Read a note
export const readNote: ReadNote = async (filename) => {
  const filePath = path.join(getRootDir(), `${filename}.md`)
  return readFile(filePath, { encoding: fileEncoding })
}

// Write a note
export const writeNote: WriteNote = async (filename, content) => {
  const filePath = path.join(getRootDir(), `${filename}.md`)
  console.info(`Writing note: ${filePath}`)
  return writeFile(filePath, content, { encoding: fileEncoding })
}

// Create a new note
export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: path.join(rootDir, 'Untitled.md'),
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const parsedPath = path.parse(filePath)

  // Ensure the note is inside the root directory (including subfolders)
  if (!filePath.startsWith(rootDir)) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.\nAvoid using other directories!`
    })
    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '', { encoding: fileEncoding })

  return parsedPath.name // Return filename without extension
}

// Delete a note
export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  const filePath = path.join(rootDir, `${filename}.md`)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete "${filename}"?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  try {
    console.info(`Deleting note: ${filePath}`)
    await remove(filePath)
    return true
  } catch (err) {
    console.error('Failed to delete note:', err)
    return false
  }
}
