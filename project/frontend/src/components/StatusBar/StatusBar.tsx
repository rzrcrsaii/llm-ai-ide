// IDE-Agent HINT: StatusBar Bileşeni - Alt durum çubuğu

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Sync as SyncIcon,
  SyncDisabled as SyncDisabledIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Memory as MemoryIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon
} from '@mui/icons-material';
import { ProjectStatus, NotificationLevel, SystemInfo } from '../../types';

interface StatusBarProps {
  projectStatus: ProjectStatus;
  notifications: Array<{
    id: string;
    level: NotificationLevel;
    message: string;
    timestamp: Date;
  }>;
  systemInfo: SystemInfo;
  currentLanguage: string;
  currentBranch?: string;
  isConnected: boolean;
  isSyncing: boolean;
  onLanguageChange: (language: string) => void;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onBranchClick: () => void;
}

interface StatusItemProps {
  icon: React.ReactNode;
  text: string;
  tooltip?: string;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  badge?: number;
}

const StatusItem: React.FC<StatusItemProps> = ({
  icon,
  text,
  tooltip,
  onClick,
  color = 'primary',
  badge
}) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.25,
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: 0.5,
        '&:hover': onClick ? {
          backgroundColor: 'var(--color-statusbar-item-hover)'
        } : {}
      }}
      onClick={onClick}
    >
      {badge !== undefined ? (
        <Badge badgeContent={badge} color={color as any} max={99}>
          {icon}
        </Badge>
      ) : (
        icon
      )}
      <Typography
        variant="caption"
        sx={{
          fontSize: '11px',
          color: `var(--color-statusbar-${color})`,
          fontWeight: 500
        }}
      >
        {text}
      </Typography>
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement="top">
        {content}
      </Tooltip>
    );
  }

  return content;
};

const StatusBar: React.FC<StatusBarProps> = ({
  projectStatus,
  notifications,
  systemInfo,
  currentLanguage,
  currentBranch,
  isConnected,
  isSyncing,
  onLanguageChange,
  onNotificationClick,
  onSettingsClick,
  onBranchClick
}) => {
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

  const notificationCounts = useMemo(() => {
    return notifications.reduce(
      (acc, notification) => {
        acc[notification.level] = (acc[notification.level] || 0) + 1;
        return acc;
      },
      {} as Record<NotificationLevel, number>
    );
  }, [notifications]);

  const totalNotifications = useMemo(() => {
    return notifications.length;
  }, [notifications]);

  const handleLanguageMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  }, []);

  const handleLanguageMenuClose = useCallback(() => {
    setLanguageMenuAnchor(null);
  }, []);

  const handleLanguageSelect = useCallback((language: string) => {
    onLanguageChange(language);
    handleLanguageMenuClose();
  }, [onLanguageChange, handleLanguageMenuClose]);

  const getProjectStatusIcon = useCallback(() => {
    switch (projectStatus) {
      case ProjectStatus.RUNNING:
        return <CheckCircleIcon fontSize="small" sx={{ color: 'var(--color-success)' }} />;
      case ProjectStatus.BUILDING:
        return <SyncIcon fontSize="small" sx={{ color: 'var(--color-warning)', animation: 'spin 1s linear infinite' }} />;
      case ProjectStatus.ERROR:
        return <ErrorIcon fontSize="small" sx={{ color: 'var(--color-error)' }} />;
      case ProjectStatus.STOPPED:
      default:
        return <SyncDisabledIcon fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />;
    }
  }, [projectStatus]);

  const getProjectStatusText = useCallback(() => {
    switch (projectStatus) {
      case ProjectStatus.RUNNING:
        return 'Running';
      case ProjectStatus.BUILDING:
        return 'Building';
      case ProjectStatus.ERROR:
        return 'Error';
      case ProjectStatus.STOPPED:
      default:
        return 'Stopped';
    }
  }, [projectStatus]);

  const getProjectStatusColor = useCallback(() => {
    switch (projectStatus) {
      case ProjectStatus.RUNNING:
        return 'success';
      case ProjectStatus.BUILDING:
        return 'warning';
      case ProjectStatus.ERROR:
        return 'error';
      case ProjectStatus.STOPPED:
      default:
        return 'secondary';
    }
  }, [projectStatus]);

  const formatBytes = useCallback((bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }, []);

  const formatPercentage = useCallback((value: number) => {
    return `${Math.round(value)}%`;
  }, []);

  return (
    <Box
      sx={{
        height: 22,
        backgroundColor: 'var(--color-statusbar-background)',
        borderTop: '1px solid var(--color-statusbar-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 1,
        overflow: 'hidden'
      }}
    >
      {/* Left Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Project Status */}
        <StatusItem
          icon={getProjectStatusIcon()}
          text={getProjectStatusText()}
          tooltip={`Project Status: ${getProjectStatusText()}`}
          color={getProjectStatusColor() as any}
        />

        {/* Git Branch */}
        {currentBranch && (
          <StatusItem
            icon={<SyncIcon fontSize="small" />}
            text={currentBranch}
            tooltip={`Current Branch: ${currentBranch}`}
            onClick={onBranchClick}
          />
        )}

        {/* Sync Status */}
        <StatusItem
          icon={isSyncing ? (
            <SyncIcon fontSize="small" sx={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <CheckCircleIcon fontSize="small" />
          )}
          text={isSyncing ? 'Syncing...' : 'Synced'}
          tooltip={isSyncing ? 'Synchronizing changes' : 'All changes synchronized'}
          color={isSyncing ? 'warning' : 'success'}
        />

        {/* Connection Status */}
        <StatusItem
          icon={isConnected ? (
            <WifiIcon fontSize="small" />
          ) : (
            <WifiOffIcon fontSize="small" />
          )}
          text={isConnected ? 'Connected' : 'Offline'}
          tooltip={isConnected ? 'Connected to server' : 'No connection to server'}
          color={isConnected ? 'success' : 'error'}
        />
      </Box>

      {/* Center Section - Progress Bar (when building) */}
      {projectStatus === ProjectStatus.BUILDING && (
        <Box sx={{ flex: 1, mx: 2, maxWidth: 200 }}>
          <LinearProgress
            variant="indeterminate"
            sx={{
              height: 3,
              borderRadius: 1.5,
              backgroundColor: 'var(--color-statusbar-progress-background)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--color-statusbar-progress-foreground)'
              }
            }}
          />
        </Box>
      )}

      {/* Right Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* System Info */}
        <StatusItem
          icon={<MemoryIcon fontSize="small" />}
          text={formatPercentage(systemInfo.memoryUsage)}
          tooltip={`Memory Usage: ${formatPercentage(systemInfo.memoryUsage)}`}
          color={systemInfo.memoryUsage > 80 ? 'error' : systemInfo.memoryUsage > 60 ? 'warning' : 'primary'}
        />

        <StatusItem
          icon={<SpeedIcon fontSize="small" />}
          text={formatPercentage(systemInfo.cpuUsage)}
          tooltip={`CPU Usage: ${formatPercentage(systemInfo.cpuUsage)}`}
          color={systemInfo.cpuUsage > 80 ? 'error' : systemInfo.cpuUsage > 60 ? 'warning' : 'primary'}
        />

        <StatusItem
          icon={<StorageIcon fontSize="small" />}
          text={formatBytes(systemInfo.diskUsage)}
          tooltip={`Disk Usage: ${formatBytes(systemInfo.diskUsage)}`}
        />

        {/* Notifications */}
        <StatusItem
          icon={<NotificationsIcon fontSize="small" />}
          text={totalNotifications > 0 ? totalNotifications.toString() : ''}
          tooltip={`${totalNotifications} notification${totalNotifications !== 1 ? 's' : ''}`}
          onClick={onNotificationClick}
          badge={totalNotifications}
          color={notificationCounts[NotificationLevel.ERROR] > 0 ? 'error' : 
                 notificationCounts[NotificationLevel.WARNING] > 0 ? 'warning' : 'primary'}
        />

        {/* Language */}
        <StatusItem
          icon={<LanguageIcon fontSize="small" />}
          text={currentLanguage}
          tooltip={`Current Language: ${currentLanguage}`}
          onClick={handleLanguageMenuOpen}
        />

        {/* Settings */}
        <StatusItem
          icon={<SettingsIcon fontSize="small" />}
          text=""
          tooltip="Settings"
          onClick={onSettingsClick}
        />
      </Box>

      {/* Language Menu */}
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleLanguageMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--color-dropdown-background)',
            border: '1px solid var(--color-dropdown-border)',
            boxShadow: 'var(--shadow-dropdown)',
            '& .MuiMenuItem-root': {
              color: 'var(--color-dropdown-foreground)',
              fontSize: '13px',
              '&:hover': {
                backgroundColor: 'var(--color-dropdown-item-hover)'
              },
              '&.Mui-selected': {
                backgroundColor: 'var(--color-dropdown-item-active)'
              }
            }
          }
        }}
      >
        <MenuItem
          onClick={() => handleLanguageSelect('JavaScript')}
          selected={currentLanguage === 'JavaScript'}
        >
          JavaScript
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelect('TypeScript')}
          selected={currentLanguage === 'TypeScript'}
        >
          TypeScript
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelect('Python')}
          selected={currentLanguage === 'Python'}
        >
          Python
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelect('Java')}
          selected={currentLanguage === 'Java'}
        >
          Java
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelect('C++')}
          selected={currentLanguage === 'C++'}
        >
          C++
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelect('Go')}
          selected={currentLanguage === 'Go'}
        >
          Go
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelect('Rust')}
          selected={currentLanguage === 'Rust'}
        >
          Rust
        </MenuItem>
      </Menu>

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default StatusBar;