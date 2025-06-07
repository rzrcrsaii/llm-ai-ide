// IDE-Agent HINT: IPC Ana Router - Renderer ile Main process arası iletişim
import { ipcMain, BrowserWindow, dialog, shell, app } from 'electron';
import { WindowManager } from './window-manager';
import { LocalModelService } from './services/local-model-service';
import { PluginManager } from './services/plugin-manager';
import { TelemetryService } from './services/telemetry-service';
import { join } from 'path';
import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';

export interface IPCResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export class IPCMainRouter {
  private windowManager: WindowManager;
  private localModelService: LocalModelService;
  private pluginManager: PluginManager;
  private telemetryService: TelemetryService;

  constructor() {
    this.windowManager = new WindowManager();
    this.localModelService = new LocalModelService();
    this.pluginManager = new PluginManager();
    this.telemetryService = new TelemetryService();
  }

  public setupRoutes(): void {
    this.setupWindowRoutes();
    this.setupFileSystemRoutes();
    this.setupModelRoutes();
    this.setupPluginRoutes();
    this.setupSystemRoutes();
    this.setupTelemetryRoutes();
    this.setupDialogRoutes();
  }

  private setupWindowRoutes(): void {
    // Pencere yönetimi
    ipcMain.handle('window:create', async (event, type: string, options?: any) => {
      try {
        const window = this.windowManager.createWindow(type, options);
        return this.createResponse(true, { windowId: window.id });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('window:close', async (event, type: string) => {
      try {
        this.windowManager.closeWindow(type);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('window:focus', async (event, type: string) => {
      try {
        this.windowManager.focusWindow(type);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('window:minimize', async (event, type: string) => {
      try {
        this.windowManager.minimizeWindow(type);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('window:maximize', async (event, type: string) => {
      try {
        this.windowManager.maximizeWindow(type);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('window:set-bounds', async (event, type: string, bounds: Partial<Electron.Rectangle>) => {
      try {
        this.windowManager.setWindowBounds(type, bounds);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private setupFileSystemRoutes(): void {
    // Dosya sistemi işlemleri
    ipcMain.handle('fs:read-file', async (event, filePath: string) => {
      try {
        const content = await readFile(filePath, 'utf-8');
        return this.createResponse(true, { content });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('fs:write-file', async (event, filePath: string, content: string) => {
      try {
        await writeFile(filePath, content, 'utf-8');
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('fs:read-directory', async (event, dirPath: string) => {
      try {
        const items = await readdir(dirPath, { withFileTypes: true });
        const result = items.map(item => ({
          name: item.name,
          isDirectory: item.isDirectory(),
          isFile: item.isFile()
        }));
        return this.createResponse(true, { items: result });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('fs:get-stats', async (event, path: string) => {
      try {
        const stats = await stat(path);
        return this.createResponse(true, {
          size: stats.size,
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
          mtime: stats.mtime,
          ctime: stats.ctime
        });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('fs:exists', async (event, path: string) => {
      try {
        const exists = existsSync(path);
        return this.createResponse(true, { exists });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private setupModelRoutes(): void {
    // Model yönetimi
    ipcMain.handle('model:list-available', async (event) => {
      try {
        const models = await this.localModelService.getAvailableModels();
        return this.createResponse(true, { models });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('model:load', async (event, modelId: string) => {
      try {
        await this.localModelService.loadModel(modelId);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('model:unload', async (event, modelId: string) => {
      try {
        await this.localModelService.unloadModel(modelId);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('model:get-status', async (event, modelId: string) => {
      try {
        const status = await this.localModelService.getModelStatus(modelId);
        return this.createResponse(true, { status });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('model:inference', async (event, modelId: string, input: any) => {
      try {
        const result = await this.localModelService.runInference(modelId, input);
        return this.createResponse(true, { result });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private setupPluginRoutes(): void {
    // Plugin yönetimi
    ipcMain.handle('plugin:list', async (event) => {
      try {
        const plugins = await this.pluginManager.getInstalledPlugins();
        return this.createResponse(true, { plugins });
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('plugin:enable', async (event, pluginId: string) => {
      try {
        await this.pluginManager.enablePlugin(pluginId);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('plugin:disable', async (event, pluginId: string) => {
      try {
        await this.pluginManager.disablePlugin(pluginId);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('plugin:install', async (event, pluginPath: string) => {
      try {
        await this.pluginManager.installPlugin(pluginPath);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private setupSystemRoutes(): void {
    // Sistem bilgileri
    ipcMain.handle('system:get-info', async (event) => {
      try {
        const info = {
          platform: process.platform,
          arch: process.arch,
          version: app.getVersion(),
          electronVersion: process.versions.electron,
          nodeVersion: process.versions.node,
          chromeVersion: process.versions.chrome
        };
        return this.createResponse(true, info);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('system:open-external', async (event, url: string) => {
      try {
        await shell.openExternal(url);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('system:show-item-in-folder', async (event, path: string) => {
      try {
        shell.showItemInFolder(path);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private setupTelemetryRoutes(): void {
    // Telemetri
    ipcMain.handle('telemetry:track-event', async (event, eventName: string, properties?: any) => {
      try {
        await this.telemetryService.trackEvent(eventName, properties);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('telemetry:track-error', async (event, error: Error, context?: any) => {
      try {
        await this.telemetryService.trackError(error, context);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private setupDialogRoutes(): void {
    // Dialog işlemleri
    ipcMain.handle('dialog:show-open', async (event, options: Electron.OpenDialogOptions) => {
      try {
        const result = await dialog.showOpenDialog(options);
        return this.createResponse(true, result);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('dialog:show-save', async (event, options: Electron.SaveDialogOptions) => {
      try {
        const result = await dialog.showSaveDialog(options);
        return this.createResponse(true, result);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('dialog:show-message', async (event, options: Electron.MessageBoxOptions) => {
      try {
        const result = await dialog.showMessageBox(options);
        return this.createResponse(true, result);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });

    ipcMain.handle('dialog:show-error', async (event, title: string, content: string) => {
      try {
        dialog.showErrorBox(title, content);
        return this.createResponse(true);
      } catch (error) {
        return this.createResponse(false, null, (error as Error).message);
      }
    });
  }

  private createResponse<T>(success: boolean, data?: T, error?: string): IPCResponse<T> {
    return {
      success,
      data,
      error,
      timestamp: Date.now()
    };
  }

  public removeAllListeners(): void {
    ipcMain.removeAllListeners();
  }
}