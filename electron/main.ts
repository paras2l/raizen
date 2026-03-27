import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Porcupine } from '@picovoice/porcupine-node'
import { PvRecorder } from '@picovoice/pvrecorder-node'
import { discoveryService } from '../src/lib/network/bonjour'
import { tailscaleManager } from '../src/lib/network/tailscale'

const _dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(_dirname, '..')

let win: BrowserWindow | null = null
let tray: Tray | null = null
let recorder: PvRecorder | null = null
let porcupine: Porcupine | null = null

// Picovoice Access Key
const ACCESS_KEY = process.env.PICOVOICE_ACCESS_KEY || "(USER_KEY_REQUIRED)"

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - because Vite will replace it
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

function createTray() {
  const icon = nativeImage.createEmpty() 
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show Raizen', click: () => win?.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => { app.quit() } }
  ])
  tray.setToolTip('Raizen OS')
  tray.setContextMenu(contextMenu)
}

function createWindow() {
  const appRoot = process.env.APP_ROOT || path.join(_dirname, '..')
  const vitePublic = process.env.VITE_PUBLIC || path.join(appRoot, 'public')

  win = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(vitePublic, 'favicon.ico'),
    webPreferences: {
      preload: path.join(_dirname, 'preload.mjs'),
      webviewTag: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#10181d',
    show: false,
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  win.on('ready-to-show', () => {
    win?.show()
    startWakeWordListener()
  })
}

async function startWakeWordListener() {
  if (ACCESS_KEY === "(USER_KEY_REQUIRED)") {
    console.warn("Picovoice Access Key missing. Wake-word detection disabled.")
    return
  }

  try {
    porcupine = new Porcupine(ACCESS_KEY, [], [0.5]) 
    recorder = new PvRecorder(porcupine.frameLength, -1)
    recorder.start()

    console.log("Listening for wake-word...")

    while (recorder) {
      const frame = await recorder.read()
      const index = porcupine.process(frame)
      if (index >= 0) {
        console.log("Wake-word detected!")
        handleWakeActivation()
      }
    }
  } catch (err) {
    console.error("Failed to initialize wake-word listener:", err)
  }
}

function handleWakeActivation() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
    win.webContents.send('wake-word-detected')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {}
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
    createTray()
    createWindow()
    
    // Start networking services
    discoveryService.start().catch(err => console.error('Failed to start discovery:', err));
    tailscaleManager.status().then(status => console.log('[NETWORK] Tailscale Status:', status));
})
