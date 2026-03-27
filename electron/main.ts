import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { discoveryService } from '../src/lib/network/bonjour'
import { tailscaleManager } from '../src/lib/network/tailscale'

// ESM-safe __dirname polyfill
const _dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(_dirname, '..')

let win: BrowserWindow | null = null
let tray: Tray | null = null

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

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
    // Wake-word listener requires PICOVOICE_ACCESS_KEY env var to activate
    // Set PICOVOICE_ACCESS_KEY in your .env to enable this feature
  })
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
  discoveryService.start().catch(err => console.error('Failed to start discovery:', err))
  tailscaleManager.status().then(status => console.log('[NETWORK] Tailscale Status:', status))
})

// --- Security Codewords (Backend Only) ---
const ADMIN_CODEWORD = 'paro the chief'
const MASTER_CODEWORD = 'paro the master'

import { ipcMain } from 'electron'

ipcMain.handle('raizen-security-verify', (_event, input: string) => {
  const norm = input.trim().toLowerCase()
  if (norm.includes(MASTER_CODEWORD)) return 'master'
  if (norm.includes(ADMIN_CODEWORD)) return 'admin'
  return null
})

ipcMain.handle('raizen-security-clean', (_event, text: string) => {
  return text
    .replace(new RegExp(MASTER_CODEWORD, 'ig'), '')
    .replace(new RegExp(ADMIN_CODEWORD, 'ig'), '')
    .trim()
})
