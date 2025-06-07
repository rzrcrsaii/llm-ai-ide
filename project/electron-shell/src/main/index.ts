// IDE-Agent HINT: Electron ana process - IPC orchestrator ve window yönetimi
import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { join } from 'path';
import { WindowManager } from './window-manager';
import { IPCMainRouter } from './ipc-main-router';
import { MenuSetup } from './menu-setup';
import { SecurityService } from './services/security-service';
import { TelemetryService } from './services/telemetry-service';
import { CrashReporter } from './services/crash-reporter';
import { LocalModelService } from './services/local-model-service';
import { PluginManager } from './services/plugin-manager';

class IDEAgentMain {
  private windowManager: WindowManager;
  private ipcRouter: IPCMainRouter;
  private menuSetup: MenuSetup;
  private securityService: SecurityService;
  private telemetryService: TelemetryService;
  private crashReporter: CrashReporter;
  private localModelService: LocalModelService;
  private pluginManager: PluginManager;

  constructor() {
    this.initializeServices();
    this.setupEventHandlers();
  }

  private initializeServices(): void {
    this.windowManager = new WindowManager();
    this.ipcRouter = new IPCMainRouter();
    this.menuSetup = new MenuSetup();
    this.securityService = new SecurityService();
    this.telemetryService = new TelemetryService();
    this.crashReporter = new CrashReporter();
    this.localModelService = new LocalModelService();
    this.pluginManager = new PluginManager();
  }

  private setupEventHandlers(): void {
    app.whenReady().then(() => {
      this.onReady();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.windowManager.createMainWindow();
      }
    });

    app.on('before-quit', async () => {
      await this.cleanup();
    });
  }

  private async onReady(): Promise<void> {
    // Security setup
    this.securityService.setupSecurityPolicies();
    
    // Crash reporter
    this.crashReporter.start();
    
    // Telemetry
    await this.telemetryService.initialize();
    
    // Menu setup
    this.menuSetup.createApplicationMenu();
    
    // IPC routing
    this.ipcRouter.setupRoutes();
    
    // Plugin system
    await this.pluginManager.loadPlugins();
    
    // Local model service
    await this.localModelService.initialize();
    
    // Create main window
    this.windowManager.createMainWindow();
    
    // Development tools
    if (process.env.NODE_ENV === 'development') {
      this.setupDevelopmentTools();
    }
  }

  private setupDevelopmentTools(): void {
    // Install React DevTools, Redux DevTools etc.
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
    
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name: string) => console.log(`Added Extension: ${name}`))
      .catch((err: any) => console.log('An error occurred: ', err));
  }

  private async cleanup(): Promise<void> {
    await this.localModelService.cleanup();
    await this.telemetryService.flush();
    this.pluginManager.unloadAll();
  }
}

// Global exception handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  dialog.showErrorBox('Unexpected Error', error.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Initialize application
const ideAgent = new IDEAgentMain();

export default ideAgent;