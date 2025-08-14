import { createNote, deleteNote, getNotes, readNote, writeNote } from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  minWidth: 800,
  minHeight: 600,
  show: false,
  center: true,
  autoHideMenuBar: true,
  icon: icon,
  title: 'Jotara',
  frame: true, // Keep normal Windows frame
  transparent: false, // remove transparency
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: true,
    contextIsolation: true,
  },
})


  // Set window properties for better transparency support
  if (process.platform === 'win32') {
    // Windows-specific transparency enhancements
    mainWindow.setBackgroundColor('#00000000')
    
    // Enable click-through for transparent areas (optional)
    // mainWindow.setIgnoreMouseEvents(true, { forward: true })
  }

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) return
    
    mainWindow.show()
    mainWindow.focus()
    
    // Optional: Add window entrance animation
    mainWindow.setOpacity(0)
    let opacity = 0
    const fadeIn = setInterval(() => {
      opacity += 0.05
      if (opacity >= 1) {
        opacity = 1
        clearInterval(fadeIn)
      }
      mainWindow?.setOpacity(opacity)
    }, 16) // 60fps
  })

  // Handle window blur/focus for transparency effects
  mainWindow.on('blur', () => {
    // Reduce opacity when window loses focus (optional)
    // mainWindow?.setOpacity(0.95)
  })

  mainWindow.on('focus', () => {
    // Restore full opacity when window gains focus
    mainWindow?.setOpacity(1)
  })

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Development tools
  if (is.dev) {
    // Open DevTools in development
    // mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  // Load the application
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Custom window controls for frameless window
  mainWindow.webContents.on('dom-ready', () => {
    // Inject custom window controls CSS if needed
    mainWindow?.webContents.insertCSS(`
      /* Ensure proper transparency */
      html, body {
        background: transparent !important;
      }
      
      /* Custom scrollbar for transparent theme */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      /* Selection styles */
      ::selection {
        background: rgba(99, 102, 241, 0.3);
      }
      
      /* Focus styles */
      *:focus {
        outline: 2px solid rgba(99, 102, 241, 0.5);
        outline-offset: 2px;
      }
      
      /* Smooth transitions for all elements */
      * {
        transition: all 0.2s ease-out;
      }
    `)
  })
}

// App initialization
app.whenReady().then(() => {
  // Set app user model ID for Windows
  electronApp.setAppUserModelId('com.notemark.transparent.app')

  // Optimize window shortcuts
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Register IPC handlers for file operations
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))

  // Window management IPC handlers
  ipcMain.handle('window-minimize', () => {
    mainWindow?.minimize()
  })

  ipcMain.handle('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow?.maximize()
    }
  })

  ipcMain.handle('window-close', () => {
    mainWindow?.close()
  })

  ipcMain.handle('window-toggle-always-on-top', () => {
    const isAlwaysOnTop = mainWindow?.isAlwaysOnTop()
    mainWindow?.setAlwaysOnTop(!isAlwaysOnTop)
    return !isAlwaysOnTop
  })

  // Create the main window
  createWindow()

  // macOS specific behavior
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Security: Prevent new window creation
app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })
})

// Handle certificate errors
app.on('certificate-error', (event, _webContents, _url, _error, _certificate, callback) => {
  if (is.dev) {
    // In development, ignore certificate errors
    event.preventDefault()
    callback(true)
  } else {
    // In production, use default behavior
    callback(false)
  }
})