// IDE-Agent HINT: Sidebar Bileşeni - Sol kenar çubuğu ve dosya gezgini

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { FileSystemItem, FileSystemItemType } from '../../types';

interface SidebarProps {
  visible: boolean;
  width: number;
  fileSystem: FileSystemItem[];
  selectedFile?: string;
  expandedFolders: Set<string>;
  onFileSelect: (file: FileSystemItem) => void;
  onFolderToggle: (folderId: string) => void;
  onFileCreate: (parentPath: string, type: FileSystemItemType) => void;
  onFileDelete: (filePath: string) => void;
  onFileRename: (oldPath: string, newPath: string) => void;
  onRefresh: () => void;
  onWidthChange: (width: number) => void;
}

interface FileTreeItemProps {
  item: FileSystemItem;
  level: number;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (item: FileSystemItem) => void;
  onToggle: (itemId: string) => void;
  onContextMenu: (event: React.MouseEvent, item: FileSystemItem) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  item,
  level,
  isSelected,
  isExpanded,
  onSelect,
  onToggle,
  onContextMenu
}) => {
  const handleClick = useCallback(() => {
    if (item.type === FileSystemItemType.DIRECTORY) {
      onToggle(item.id);
    } else {
      onSelect(item);
    }
  }, [item, onSelect, onToggle]);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    onContextMenu(event, item);
  }, [item, onContextMenu]);

  const getFileIcon = useCallback((item: FileSystemItem) => {
    if (item.type === FileSystemItemType.DIRECTORY) {
      return isExpanded ? <FolderOpenIcon fontSize="small" /> : <FolderIcon fontSize="small" />;
    }
    
    // File type specific icons could be added here
    const extension = item.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <FileIcon fontSize="small" sx={{ color: '#f7df1e' }} />;
      case 'py':
        return <FileIcon fontSize="small" sx={{ color: '#3776ab' }} />;
      case 'json':
        return <FileIcon fontSize="small" sx={{ color: '#000000' }} />;
      case 'css':
        return <FileIcon fontSize="small" sx={{ color: '#1572b6' }} />;
      case 'html':
        return <FileIcon fontSize="small" sx={{ color: '#e34f26' }} />;
      case 'md':
        return <FileIcon fontSize="small" sx={{ color: '#083fa1' }} />;
      default:
        return <FileIcon fontSize="small" />;
    }
  }, [isExpanded]);

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          pl: level * 2,
          backgroundColor: isSelected ? 'var(--color-sidebar-item-active)' : 'transparent',
          '&:hover': {
            backgroundColor: 'var(--color-sidebar-item-hover)'
          }
        }}
      >
        <ListItemButton
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          sx={{
            minHeight: 24,
            px: 1,
            py: 0.25,
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          {item.type === FileSystemItemType.DIRECTORY && (
            <ListItemIcon sx={{ minWidth: 20, mr: 0.5 }}>
              {isExpanded ? (
                <ExpandMoreIcon fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />
              ) : (
                <ChevronRightIcon fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />
              )}
            </ListItemIcon>
          )}
          
          <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
            {getFileIcon(item)}
          </ListItemIcon>
          
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              fontSize: '13px',
              color: 'var(--color-text)',
              noWrap: true
            }}
          />
          
          {item.isHidden && (
            <Typography
              variant="caption"
              sx={{
                color: 'var(--color-text-muted)',
                fontSize: '10px',
                ml: 1
              }}
            >
              H
            </Typography>
          )}
        </ListItemButton>
      </ListItem>
      
      {item.type === FileSystemItemType.DIRECTORY && item.children && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              isSelected={child.path === selectedFile}
              isExpanded={expandedFolders.has(child.id)}
              onSelect={onSelect}
              onToggle={onToggle}
              onContextMenu={onContextMenu}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  visible,
  width,
  fileSystem,
  selectedFile,
  expandedFolders,
  onFileSelect,
  onFolderToggle,
  onFileCreate,
  onFileDelete,
  onFileRename,
  onRefresh,
  onWidthChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    item: FileSystemItem;
  } | null>(null);

  const filteredFileSystem = useMemo(() => {
    if (!searchQuery.trim()) {
      return fileSystem;
    }

    const filterItems = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.reduce((acc: FileSystemItem[], item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (item.type === FileSystemItemType.DIRECTORY && item.children) {
          const filteredChildren = filterItems(item.children);
          if (matchesSearch || filteredChildren.length > 0) {
            acc.push({
              ...item,
              children: filteredChildren
            });
          }
        } else if (matchesSearch) {
          acc.push(item);
        }
        
        return acc;
      }, []);
    };

    return filterItems(fileSystem);
  }, [fileSystem, searchQuery]);

  const handleContextMenu = useCallback((event: React.MouseEvent, item: FileSystemItem) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      item
    });
  }, []);

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleCreateFile = useCallback(() => {
    if (contextMenu) {
      const parentPath = contextMenu.item.type === FileSystemItemType.DIRECTORY 
        ? contextMenu.item.path 
        : contextMenu.item.path.split('/').slice(0, -1).join('/');
      onFileCreate(parentPath, FileSystemItemType.FILE);
      handleContextMenuClose();
    }
  }, [contextMenu, onFileCreate, handleContextMenuClose]);

  const handleCreateFolder = useCallback(() => {
    if (contextMenu) {
      const parentPath = contextMenu.item.type === FileSystemItemType.DIRECTORY 
        ? contextMenu.item.path 
        : contextMenu.item.path.split('/').slice(0, -1).join('/');
      onFileCreate(parentPath, FileSystemItemType.DIRECTORY);
      handleContextMenuClose();
    }
  }, [contextMenu, onFileCreate, handleContextMenuClose]);

  const handleDelete = useCallback(() => {
    if (contextMenu) {
      onFileDelete(contextMenu.item.path);
      handleContextMenuClose();
    }
  }, [contextMenu, onFileDelete, handleContextMenuClose]);

  const handleRename = useCallback(() => {
    if (contextMenu) {
      const newName = prompt('Enter new name:', contextMenu.item.name);
      if (newName && newName !== contextMenu.item.name) {
        const newPath = contextMenu.item.path.split('/').slice(0, -1).concat(newName).join('/');
        onFileRename(contextMenu.item.path, newPath);
      }
      handleContextMenuClose();
    }
  }, [contextMenu, onFileRename, handleContextMenuClose]);

  if (!visible) {
    return null;
  }

  return (
    <Box
      sx={{
        width,
        minWidth: 200,
        maxWidth: 500,
        height: '100%',
        backgroundColor: 'var(--color-sidebar-background)',
        borderRight: '1px solid var(--color-sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        resize: 'horizontal'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 35,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-sidebar-border)',
          backgroundColor: 'var(--color-surface)'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            color: 'var(--color-text-secondary)'
          }}
        >
          Explorer
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="New File">
            <IconButton
              size="small"
              onClick={() => onFileCreate('', FileSystemItemType.FILE)}
              sx={{ color: 'var(--color-text-secondary)' }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Refresh">
            <IconButton
              size="small"
              onClick={onRefresh}
              sx={{ color: 'var(--color-text-secondary)' }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="More Actions">
            <IconButton
              size="small"
              sx={{ color: 'var(--color-text-secondary)' }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ p: 1 }}>
        <TextField
          size="small"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchQuery('')}
                  sx={{ color: 'var(--color-text-secondary)' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--color-input-background)',
              color: 'var(--color-input-foreground)',
              fontSize: '13px',
              '& fieldset': {
                borderColor: 'var(--color-input-border)'
              },
              '&:hover fieldset': {
                borderColor: 'var(--color-input-border)'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-input-focus-border)'
              }
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'var(--color-input-placeholder)',
              opacity: 1
            }
          }}
        />
      </Box>

      {/* File Tree */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: 8
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--color-scrollbar-track)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--color-scrollbar-thumb)',
            borderRadius: 4
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'var(--color-scrollbar-thumb-hover)'
          }
        }}
      >
        <List dense sx={{ py: 0 }}>
          {filteredFileSystem.map((item) => (
            <FileTreeItem
              key={item.id}
              item={item}
              level={0}
              isSelected={item.path === selectedFile}
              isExpanded={expandedFolders.has(item.id)}
              onSelect={onFileSelect}
              onToggle={onFolderToggle}
              onContextMenu={handleContextMenu}
            />
          ))}
        </List>
      </Box>

      {/* Context Menu */}
      {contextMenu && (
        <Box
          sx={{
            position: 'fixed',
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            zIndex: 3000,
            backgroundColor: 'var(--color-dropdown-background)',
            border: '1px solid var(--color-dropdown-border)',
            borderRadius: 1,
            boxShadow: 'var(--shadow-dropdown)',
            py: 0.5,
            minWidth: 150
          }}
          onMouseLeave={handleContextMenuClose}
        >
          <List dense sx={{ py: 0 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleCreateFile} sx={{ py: 0.5, px: 2 }}>
                <ListItemText
                  primary="New File"
                  primaryTypographyProps={{
                    fontSize: '13px',
                    color: 'var(--color-dropdown-foreground)'
                  }}
                />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleCreateFolder} sx={{ py: 0.5, px: 2 }}>
                <ListItemText
                  primary="New Folder"
                  primaryTypographyProps={{
                    fontSize: '13px',
                    color: 'var(--color-dropdown-foreground)'
                  }}
                />
              </ListItemButton>
            </ListItem>
            
            <Divider sx={{ my: 0.5 }} />
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleRename} sx={{ py: 0.5, px: 2 }}>
                <ListItemText
                  primary="Rename"
                  primaryTypographyProps={{
                    fontSize: '13px',
                    color: 'var(--color-dropdown-foreground)'
                  }}
                />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleDelete} sx={{ py: 0.5, px: 2 }}>
                <ListItemText
                  primary="Delete"
                  primaryTypographyProps={{
                    fontSize: '13px',
                    color: 'var(--color-error)'
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;