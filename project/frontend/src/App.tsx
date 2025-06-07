// IDE-Agent HINT: Frontend Ana Uygulama - React TypeScript IDE arayüzü
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatusBar from './components/layout/StatusBar';
import MainContent from './components/layout/MainContent';
import ModelHub from './components/model-hub/ModelHub';
import CodeEditor from './components/editor/CodeEditor';
import Terminal from './components/terminal/Terminal';
import FileExplorer from './components/file-explorer/FileExplorer';
import AIAssistant from './components/ai-assistant/AIAssistant';
import Settings from './components/settings/Settings';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useWebSocket } from './hooks/useWebSocket';
import { useElectronAPI } from './hooks/useElectronAPI';

// Types
import { LayoutConfig } from './types/layout';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isConnected } = useWebSocket();
  const { electronAPI } = useElectronAPI();
  
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    sidebarWidth: 250,
    sidebarCollapsed: false,
    bottomPanelHeight: 200,
    bottomPanelVisible: true,
    rightPanelWidth: 300,
    rightPanelVisible: true
  });

  const [activeView, setActiveView] = useState<string>('editor');
  const [sidebarTab, setSidebarTab] = useState<string>('explorer');
  const [bottomTab, setBottomTab] = useState<string>('terminal');
  const [rightTab, setRightTab] = useState<string>('ai-assistant');

  // Material-UI tema
  const muiTheme = createTheme({
    palette: {
      mode: theme.mode,
      primary: {
        main: theme.colors.primary,
      },
      secondary: {
        main: theme.colors.secondary,
      },
      background: {
        default: theme.colors.background,
        paper: theme.colors.surface,
      },
      text: {
        primary: theme.colors.text,
        secondary: theme.colors.textSecondary,
      },
    },
    typography: {
      fontFamily: theme.fonts.mono,
    },
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+P: Command Palette
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        // TODO: Open command palette
      }
      
      // Ctrl+`: Toggle Terminal
      if (event.ctrlKey && event.key === '`') {
        event.preventDefault();
        setLayoutConfig(prev => ({
          ...prev,
          bottomPanelVisible: !prev.bottomPanelVisible
        }));
      }
      
      // Ctrl+B: Toggle Sidebar
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        setLayoutConfig(prev => ({
          ...prev,
          sidebarCollapsed: !prev.sidebarCollapsed
        }));
      }
      
      // Ctrl+Shift+E: File Explorer
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        setSidebarTab('explorer');
        setLayoutConfig(prev => ({ ...prev, sidebarCollapsed: false }));
      }
      
      // Ctrl+Shift+M: Model Hub
      if (event.ctrlKey && event.shiftKey && event.key === 'M') {
        event.preventDefault();
        setActiveView('model-hub');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Layout handlers
  const handleSidebarResize = (width: number) => {
    setLayoutConfig(prev => ({ ...prev, sidebarWidth: width }));
  };

  const handleBottomPanelResize = (height: number) => {
    setLayoutConfig(prev => ({ ...prev, bottomPanelHeight: height }));
  };

  const handleRightPanelResize = (width: number) => {
    setLayoutConfig(prev => ({ ...prev, rightPanelWidth: width }));
  };

  const renderSidebarContent = () => {
    switch (sidebarTab) {
      case 'explorer':
        return <FileExplorer />;
      case 'search':
        return <div>Search Panel</div>;
      case 'git':
        return <div>Git Panel</div>;
      case 'extensions':
        return <div>Extensions Panel</div>;
      default:
        return <FileExplorer />;
    }
  };

  const renderBottomContent = () => {
    switch (bottomTab) {
      case 'terminal':
        return <Terminal />;
      case 'problems':
        return <div>Problems Panel</div>;
      case 'output':
        return <div>Output Panel</div>;
      case 'debug':
        return <div>Debug Console</div>;
      default:
        return <Terminal />;
    }
  };

  const renderRightContent = () => {
    switch (rightTab) {
      case 'ai-assistant':
        return <AIAssistant />;
      case 'outline':
        return <div>Outline Panel</div>;
      case 'timeline':
        return <div>Timeline Panel</div>;
      default:
        return <AIAssistant />;
    }
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'editor':
        return <CodeEditor />;
      case 'model-hub':
        return <ModelHub />;
      case 'settings':
        return <Settings />;
      default:
        return <CodeEditor />;
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100vh',
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              fontFamily: theme.fonts.mono
            }}
          >
            {/* Header */}
            <Header 
              onThemeToggle={toggleTheme}
              onViewChange={setActiveView}
              activeView={activeView}
              isConnected={isConnected}
            />
            
            {/* Main Layout */}
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Sidebar */}
              {!layoutConfig.sidebarCollapsed && (
                <Sidebar
                  width={layoutConfig.sidebarWidth}
                  activeTab={sidebarTab}
                  onTabChange={setSidebarTab}
                  onResize={handleSidebarResize}
                >
                  {renderSidebarContent()}
                </Sidebar>
              )}
              
              {/* Main Content Area */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Editor/Main Content */}
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <MainContent>
                    {renderMainContent()}
                  </MainContent>
                </Box>
                
                {/* Bottom Panel */}
                {layoutConfig.bottomPanelVisible && (
                  <Box 
                    sx={{ 
                      height: layoutConfig.bottomPanelHeight,
                      borderTop: `1px solid ${theme.colors.border}`,
                      backgroundColor: theme.colors.surface
                    }}
                  >
                    {/* Bottom Panel Tabs */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        borderBottom: `1px solid ${theme.colors.border}`,
                        backgroundColor: theme.colors.background
                      }}
                    >
                      {['terminal', 'problems', 'output', 'debug'].map((tab) => (
                        <Box
                          key={tab}
                          onClick={() => setBottomTab(tab)}
                          sx={{
                            px: 2,
                            py: 1,
                            cursor: 'pointer',
                            borderBottom: bottomTab === tab ? `2px solid ${theme.colors.primary}` : 'none',
                            backgroundColor: bottomTab === tab ? theme.colors.surface : 'transparent',
                            '&:hover': {
                              backgroundColor: theme.colors.hover
                            }
                          }}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Box>
                      ))}
                    </Box>
                    
                    {/* Bottom Panel Content */}
                    <Box sx={{ height: 'calc(100% - 40px)', overflow: 'hidden' }}>
                      {renderBottomContent()}
                    </Box>
                  </Box>
                )}
              </Box>
              
              {/* Right Panel */}
              {layoutConfig.rightPanelVisible && (
                <Box 
                  sx={{ 
                    width: layoutConfig.rightPanelWidth,
                    borderLeft: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.surface,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Right Panel Tabs */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      borderBottom: `1px solid ${theme.colors.border}`,
                      backgroundColor: theme.colors.background
                    }}
                  >
                    {['ai-assistant', 'outline', 'timeline'].map((tab) => (
                      <Box
                        key={tab}
                        onClick={() => setRightTab(tab)}
                        sx={{
                          px: 2,
                          py: 1,
                          cursor: 'pointer',
                          borderBottom: rightTab === tab ? `2px solid ${theme.colors.primary}` : 'none',
                          backgroundColor: rightTab === tab ? theme.colors.surface : 'transparent',
                          '&:hover': {
                            backgroundColor: theme.colors.hover
                          }
                        }}
                      >
                        {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Box>
                    ))}
                  </Box>
                  
                  {/* Right Panel Content */}
                  <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    {renderRightContent()}
                  </Box>
                </Box>
              )}
            </Box>
            
            {/* Status Bar */}
            <StatusBar 
              layoutConfig={layoutConfig}
              onLayoutChange={setLayoutConfig}
              isConnected={isConnected}
            />
          </Box>
          
          {/* Toast Notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme.mode}
          />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;