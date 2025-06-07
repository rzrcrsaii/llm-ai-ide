// IDE-Agent HINT: Window yönetimi - Ana pencere, panel ve modal yönetimi
import { BrowserWindow, screen, app } from 'electron';
import { join } from 'path';
import { is } from 'electron-util';

export interface WindowConfig {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  x?: number;
  y?: number;
  show?: boolean;
  frame?: boolean;
  titleBarStyle?: 'default' | 'hidden' | 'hiddenInset' | 'customButtonsOnHover';
  webPreferences?: Electron.WebPreferences;
}

export class WindowManager {
  private mainWindow: BrowserWindow | null = null;
  private windows: Map<string, BrowserWindow> = new Map();
  private windowConfigs: Map<string, WindowConfig> = new Map();

  constructor() {
    this.setupDefaultConfigs();
  }

  private setupDefaultConfigs(): void {
    // Ana pencere konfigürasyonu
    this.windowConfigs.set('main', {
      width: 1400,
      height: 900,
      minWidth: 800,
      minHeight: 600,
      show: false,
      titleBarStyle: is.macos ? 'hiddenInset' : 'default',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: join(__dirname, '../preload/index.js'),
        webSecurity: true,
        allowRunningInsecureContent: false,
        experimentalFeatures: false
      }
    });

    // Terminal pencere konfigürasyonu
    this.windowConfigs.set('terminal', {
      width: 800,
      height: 600,
      minWidth: 400,
      minHeight: 300,
      show: false,
      frame: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, '../preload/terminal.js'),
        webSecurity: true
      }
    });

    // Model viewer pencere konfigürasyonu
    this.windowConfigs.set('model-viewer', {
      width: 1000,
      height: 700,
      minWidth: 600,
      minHeight: 400,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, '../preload/model-viewer.js'),
        webSecurity: true
      }
    });
  }

  public createMainWindow(): BrowserWindow {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.focus();
      return this.mainWindow;
    }

    const config = this.windowConfigs.get('main')!;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
    // Merkezi konumlandırma
    const x = Math.floor((width - config.width!) / 2);
    const y = Math.floor((height - config.height!) / 2);

    this.mainWindow = new BrowserWindow({
      ...config,
      x,
      y,
      icon: this.getAppIcon()
    });

    // Ana pencere URL'ini yükle
    if (is.development) {
      this.mainWindow.loadURL('http://localhost:3000');
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(join(__dirname, '../../renderer/dist/index.html'));
    }

    // Pencere event handlers
    this.setupMainWindowEvents();

    // Pencereyi göster
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
      this.mainWindow?.focus();
    });

    this.windows.set('main', this.mainWindow);
    return this.mainWindow;
  }

  private setupMainWindowEvents(): void {
    if (!this.mainWindow) return;

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
      this.windows.delete('main');
    });

    this.mainWindow.on('focus', () => {
      // Ana pencere odaklandığında
    });

    this.mainWindow.on('blur', () => {
      // Ana pencere odağını kaybettiğinde
    });

    this.mainWindow.on('maximize', () => {
      this.mainWindow?.webContents.send('window-state-changed', { maximized: true });
    });

    this.mainWindow.on('unmaximize', () => {
      this.mainWindow?.webContents.send('window-state-changed', { maximized: false });
    });

    this.mainWindow.on('enter-full-screen', () => {
      this.mainWindow?.webContents.send('window-state-changed', { fullscreen: true });
    });

    this.mainWindow.on('leave-full-screen', () => {
      this.mainWindow?.webContents.send('window-state-changed', { fullscreen: false });
    });
  }

  public createWindow(type: string, options?: Partial<WindowConfig>): BrowserWindow {
    const config = { ...this.windowConfigs.get(type), ...options };
    
    const window = new BrowserWindow({
      ...config,
      parent: this.mainWindow || undefined,
      icon: this.getAppIcon()
    });

    // URL yükleme
    if (is.development) {
      window.loadURL(`http://localhost:3000/${type}`);
    } else {
      window.loadFile(join(__dirname, `../../renderer/dist/${type}.html`));
    }

    window.on('closed', () => {
      this.windows.delete(type);
    });

    this.windows.set(type, window);
    return window;
  }

  public getWindow(type: string): BrowserWindow | null {
    return this.windows.get(type) || null;
  }

  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  public closeWindow(type: string): void {
    const window = this.windows.get(type);
    if (window && !window.isDestroyed()) {
      window.close();
    }
  }

  public closeAllWindows(): void {
    this.windows.forEach((window, type) => {
      if (!window.isDestroyed()) {
        window.close();
      }
    });
    this.windows.clear();
  }

  public focusWindow(type: string): void {
    const window = this.windows.get(type);
    if (window && !window.isDestroyed()) {
      window.focus();
    }
  }

  public minimizeWindow(type: string): void {
    const window = this.windows.get(type);
    if (window && !window.isDestroyed()) {
      window.minimize();
    }
  }

  public maximizeWindow(type: string): void {
    const window = this.windows.get(type);
    if (window && !window.isDestroyed()) {
      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
    }
  }

  public setWindowBounds(type: string, bounds: Partial<Electron.Rectangle>): void {
    const window = this.windows.get(type);
    if (window && !window.isDestroyed()) {
      const currentBounds = window.getBounds();
      window.setBounds({ ...currentBounds, ...bounds });
    }
  }

  private getAppIcon(): string | undefined {
    if (is.windows) {
      return join(__dirname, '../../assets/icon.ico');
    } else if (is.macos) {
      return join(__dirname, '../../assets/icon.icns');
    } else {
      return join(__dirname, '../../assets/icon.png');
    }
  }

  public getAllWindows(): BrowserWindow[] {
    return Array.from(this.windows.values()).filter(window => !window.isDestroyed());
  }

  public getWindowCount(): number {
    return this.getAllWindows().length;
  }
}