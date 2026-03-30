import { app, BrowserWindow, Tray, Menu, nativeImage, shell, ipcMain } from 'electron'
import { exec } from 'node:child_process'
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
  // Keep alive in tray for background listening
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

// --- Sovereign Orchestration (Native Execution) ---
ipcMain.handle('system:open-url', async (_event, url: string) => {
  console.log(`[ORCHESTRATION] Opening URL: ${url}`);
  await shell.openExternal(url);
  return { success: true };
});

ipcMain.handle('system:open-app', async (_event, appName: string) => {
  console.log(`[ORCHESTRATION] Triggering App: ${appName}`);
  
  if (appName.toLowerCase() === 'whatsapp') {
    await shell.openExternal('whatsapp://');
    return { success: true };
  }

  // Windows-specific execution logic
  const command = appName.toLowerCase() === 'chrome' ? 'start chrome' : `start ${appName}`;
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) {
        console.error(`[EXEC ERROR] Failed to open ${appName}:`, error);
        resolve({ success: false, error: error.message });
      } else {
        resolve({ success: true });
      }
    });
  });
});

ipcMain.handle('system:network-scan', async () => {
  console.log('[ORCHESTRATION] Scanning local network mesh...');
  return new Promise((resolve) => {
    exec('arp -a', (error, stdout) => {
      if (error) {
        resolve({ success: false, error: error.message });
        return;
      }
      
      const lines = stdout.split('\n');
      const devices: { ip: string, mac: string, type: string }[] = [];
      
      lines.forEach(line => {
        const match = line.trim().match(/(\d+\.\d+\.\d+\.\d+)\s+([0-9a-f-]{17})\s+(\w+)/i);
        if (match) {
          const ip = match[1];
          const mac = match[2];
          const type = match[3];
          
          if (!ip.startsWith('224.') && !ip.startsWith('239.')) { // Filter multicast
             devices.push({ ip, mac, type });
          }
        }
      });

      resolve({ success: true, data: { devices } });
    });
  });
});

ipcMain.handle('system:exec-command', async (_event, command: string) => {
  console.log(`[ORCHESTRATION] Executing Sovereign Command: ${command}`);
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({
        success: !error,
        data: {
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          error: error ? error.message : null
        }
      });
    });
  });
});
