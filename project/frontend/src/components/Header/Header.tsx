// IDE-Agent HINT: Header Bileşeni - Üst menü çubuğu ve navigasyon

import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tooltip,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  FolderOpen as OpenIcon,
  PlayArrow as RunIcon,
  Stop as StopIcon
} from '@mui/icons-material';
import { ThemeMode } from '../../types';

interface HeaderProps {
  title?: string;
  theme: ThemeMode;
  isFullscreen: boolean;
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  onToggleFullscreen: () => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
  onSaveAll: () => void;
  onOpenProject: () => void;
  onRunProject: () => void;
  onStopProject: () => void;
  isProjectRunning?: boolean;
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  title = 'LLM AI IDE',
  theme,
  isFullscreen,
  sidebarVisible,
  onToggleSidebar,
  onToggleTheme,
  onToggleFullscreen,
  onOpenSettings,
  onOpenSearch,
  onSaveAll,
  onOpenProject,
  onRunProject,
  onStopProject,
  isProjectRunning = false,
  currentUser
}) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [fileMenuAnchor, setFileMenuAnchor] = useState<null | HTMLElement>(null);
  const [viewMenuAnchor, setViewMenuAnchor] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  }, []);

  const handleUserMenuClose = useCallback(() => {
    setUserMenuAnchor(null);
  }, []);

  const handleFileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setFileMenuAnchor(event.currentTarget);
  }, []);

  const handleFileMenuClose = useCallback(() => {
    setFileMenuAnchor(null);
  }, []);

  const handleViewMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setViewMenuAnchor(event.currentTarget);
  }, []);

  const handleViewMenuClose = useCallback(() => {
    setViewMenuAnchor(null);
  }, []);

  const handleSaveAll = useCallback(() => {
    onSaveAll();
    handleFileMenuClose();
  }, [onSaveAll, handleFileMenuClose]);

  const handleOpenProject = useCallback(() => {
    onOpenProject();
    handleFileMenuClose();
  }, [onOpenProject, handleFileMenuClose]);

  const handleToggleSidebar = useCallback(() => {
    onToggleSidebar();
    handleViewMenuClose();
  }, [onToggleSidebar, handleViewMenuClose]);

  const handleToggleFullscreen = useCallback(() => {
    onToggleFullscreen();
    handleViewMenuClose();
  }, [onToggleFullscreen, handleViewMenuClose]);

  const handleRunStop = useCallback(() => {
    if (isProjectRunning) {
      onStopProject();
    } else {
      onRunProject();
    }
  }, [isProjectRunning, onRunProject, onStopProject]);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        height: 35,
        minHeight: 35,
        '& .MuiToolbar-root': {
          minHeight: 35,
          height: 35,
          padding: '0 8px'
        }
      }}
    >
      <Toolbar variant="dense">
        {/* Left Section - Menu and Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}>
            <IconButton
              size="small"
              onClick={onToggleSidebar}
              sx={{ color: 'var(--color-text)' }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* File Menu */}
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'var(--color-hover)'
              }
            }}
            onClick={handleFileMenuOpen}
          >
            File
          </Typography>

          {/* View Menu */}
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'var(--color-hover)'
              }
            }}
            onClick={handleViewMenuOpen}
          >
            View
          </Typography>
        </Box>

        {/* Center Section - Title and Actions */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text)'
            }}
          >
            {title}
          </Typography>

          {/* Quick Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
            <Tooltip title="Search (Ctrl+Shift+F)">
              <IconButton
                size="small"
                onClick={onOpenSearch}
                sx={{ color: 'var(--color-text)' }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Save All (Ctrl+Shift+S)">
              <IconButton
                size="small"
                onClick={onSaveAll}
                sx={{ color: 'var(--color-text)' }}
              >
                <SaveIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isProjectRunning ? 'Stop Project' : 'Run Project'}>
              <IconButton
                size="small"
                onClick={handleRunStop}
                sx={{
                  color: isProjectRunning ? 'var(--color-error)' : 'var(--color-success)'
                }}
              >
                {isProjectRunning ? <StopIcon fontSize="small" /> : <RunIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Right Section - Theme, Fullscreen, User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={`Switch to ${theme === ThemeMode.DARK ? 'Light' : 'Dark'} Theme`}>
            <IconButton
              size="small"
              onClick={onToggleTheme}
              sx={{ color: 'var(--color-text)' }}
            >
              {theme === ThemeMode.DARK ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
            <IconButton
              size="small"
              onClick={onToggleFullscreen}
              sx={{ color: 'var(--color-text)' }}
            >
              {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton
              size="small"
              onClick={onOpenSettings}
              sx={{ color: 'var(--color-text)' }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          {currentUser && (
            <Tooltip title="User Menu">
              <IconButton
                size="small"
                onClick={handleUserMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: '12px' }}
                  src={currentUser.avatar}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* File Menu */}
        <Menu
          anchorEl={fileMenuAnchor}
          open={Boolean(fileMenuAnchor)}
          onClose={handleFileMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: 'var(--color-dropdown-background)',
              border: '1px solid var(--color-dropdown-border)',
              '& .MuiMenuItem-root': {
                color: 'var(--color-dropdown-foreground)',
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: 'var(--color-dropdown-hover)'
                }
              }
            }
          }}
        >
          <MenuItem onClick={handleOpenProject}>
            <ListItemIcon>
              <OpenIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
            </ListItemIcon>
            <ListItemText>Open Project...</ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Ctrl+O
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSaveAll}>
            <ListItemIcon>
              <SaveIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
            </ListItemIcon>
            <ListItemText>Save All</ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Ctrl+Shift+S
            </Typography>
          </MenuItem>
        </Menu>

        {/* View Menu */}
        <Menu
          anchorEl={viewMenuAnchor}
          open={Boolean(viewMenuAnchor)}
          onClose={handleViewMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: 'var(--color-dropdown-background)',
              border: '1px solid var(--color-dropdown-border)',
              '& .MuiMenuItem-root': {
                color: 'var(--color-dropdown-foreground)',
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: 'var(--color-dropdown-hover)'
                }
              }
            }
          }}
        >
          <MenuItem onClick={handleToggleSidebar}>
            <ListItemIcon>
              <MenuIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
            </ListItemIcon>
            <ListItemText>{sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}</ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Ctrl+B
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleToggleFullscreen}>
            <ListItemIcon>
              {isFullscreen ? (
                <FullscreenExitIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
              ) : (
                <FullscreenIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
              )}
            </ListItemIcon>
            <ListItemText>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              F11
            </Typography>
          </MenuItem>
        </Menu>

        {/* User Menu */}
        {currentUser && (
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: 'var(--color-dropdown-background)',
                border: '1px solid var(--color-dropdown-border)',
                '& .MuiMenuItem-root': {
                  color: 'var(--color-dropdown-foreground)',
                  fontSize: '13px',
                  '&:hover': {
                    backgroundColor: 'var(--color-dropdown-hover)'
                  }
                }
              }
            }}
          >
            <MenuItem disabled>
              <ListItemIcon>
                <PersonIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
              </ListItemIcon>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {currentUser.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={onOpenSettings}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleUserMenuClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'var(--color-text)' }} />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;