import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Divider,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Stack
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as FarmerIcon,
  Store as BuyerIcon,
  Assignment as ContractIcon,
  Info as AboutIcon,
  ContactMail as ContactIcon,
  Close as CloseIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  PersonOutline as PersonOutlineIcon,
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from 'notistack';

interface NavigationItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  divider?: never;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
  exact?: boolean;
}

interface DividerItem {
  divider: true;
  text?: never;
  path?: never;
  icon?: never;
  authRequired?: never;
  hideWhenAuthed?: never;
}

type NavItem = NavigationItem | DividerItem;

interface NavigationProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'buyer';
  phone?: string;
  address?: string;
  profileImage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user, logout, deleteAccount } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    if (isMobile) handleDrawerToggle();
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
    if (isMobile) handleDrawerToggle();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccount();
      enqueueSnackbar('Account deleted successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Failed to delete account', { variant: 'error' });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const navItems: NavItem[] = [
    { 
      text: t('nav.home', 'Home'), 
      path: '/', 
      icon: <HomeIcon />,
      exact: true
    },
    { 
      text: t('nav.farmers', 'Farmers'), 
      path: '/farmers', 
      icon: <FarmerIcon />,
      exact: false
    },
    { 
      text: t('nav.buyers', 'Buyers'), 
      path: '/buyers', 
      icon: <BuyerIcon />,
      exact: false
    },
    { 
      text: t('nav.contracts', 'Contracts'), 
      path: '/contracts', 
      icon: <ContractIcon />,
      authRequired: true,
      exact: false
    },
    { divider: true },
    { 
      text: t('nav.about', 'About'), 
      path: '/about', 
      icon: <AboutIcon />,
      exact: true
    },
    { 
      text: t('nav.contact', 'Contact'), 
      path: '/contact', 
      icon: <ContactIcon />,
      exact: true
    },
    { 
      text: t('auth.login', 'Login'), 
      path: '/login', 
      icon: <LoginIcon />,
      hideWhenAuthed: true 
    },
  ];

  const drawer = (
    <Box 
      sx={{ 
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.02)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
          }
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            width: 32, 
            height: 32, 
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.contrastText',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            FC
          </Box>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              letterSpacing: '0.5px',
              background: 'linear-gradient(45deg, #1976d2, #00b0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}
          >
            Fasalyan
          </Typography>
        </Box>
        {isMobile && (
          <IconButton 
            onClick={handleDrawerToggle}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ 
        flexGrow: 1, 
        p: 2,
        '& .MuiListItemButton-root': {
          transition: 'all 0.2s ease-in-out',
        }
      }}>
        {navItems
          .filter(item => {
            if (item.divider) return true;
            if (item.authRequired && !isAuthenticated) return false;
            if (item.hideWhenAuthed && isAuthenticated) return false;
            return true;
          })
          .map((item, index) => (
            item.divider ? (
              <Divider key={`divider-${index}`} sx={{ my: 1 }} />
            ) : (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  selected={location.pathname === item.path}
                  onClick={isMobile ? handleDrawerToggle : undefined}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    px: 2,
                    py: 1.25,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'translateX(2px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    },
                    '&.Mui-selected, &.Mui-selected:hover': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    color: 'inherit',
                    transition: 'color 0.2s ease-in-out',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 500 : 'normal',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          ))}
      </List>
      <Box sx={{ 
        p: 2, 
        mt: 'auto',
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          display="block"
          sx={{
            fontSize: '0.7rem',
            opacity: 0.8,
            letterSpacing: '0.3px',
          }}
        >
          &copy; {new Date().getFullYear()} Fasalyan
        </Typography>
        <Typography 
          variant="caption" 
          color="text.disabled" 
          display="block"
          mt={0.5}
          sx={{
            fontSize: '0.65rem',
            opacity: 0.7,
          }}
        >
          v1.0.0
        </Typography>
      </Box>
      {isAuthenticated && isMobile && (
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              justifyContent: 'flex-start',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              color: 'text.primary',
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'text.primary',
              },
            }}
          >
            {t('auth.logout', 'Logout')}
          </Button>
        </Box>
      )}
    </Box>
  );

  // Mobile App Bar
  const mobileAppBar = isMobile && (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
      {isAuthenticated ? (
        <>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">
                {t('auth.profile', 'Profile')}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">
                {t('auth.logout', 'Logout')}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">
                {t('auth.deleteAccount', 'Delete Account')}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">
                {t('auth.deleteAccount', 'Delete Account')}
              </Typography>
            </MenuItem>
          </Menu>
          
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleCancelDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Box display="flex" alignItems="center" gap={1}>
                <WarningIcon color="error" />
                {t('auth.deleteAccountConfirm', 'Delete Account?')}
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {t('auth.deleteAccountWarning', 'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.')}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                {t('common.cancel', 'Cancel')}
              </Button>
              <Button 
                onClick={handleConfirmDelete} 
                color="error" 
                variant="contained"
                autoFocus
              >
                {t('auth.deleteAccount', 'Delete Account')}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Button
          color="inherit"
          component={RouterLink}
          to="/login"
          startIcon={<LoginIcon />}
          sx={{ textTransform: 'none' }}
        >
          {t('auth.login', 'Login')}
        </Button>
      )}
    </Box>
  );

  // Desktop App Bar
  const desktopAppBar = !isMobile && isAuthenticated && (
    <Box sx={{ position: 'fixed', top: 16, right: 24, zIndex: 1200 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="subtitle2" color="text.primary">
          {user?.name || user?.email}
        </Typography>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Avatar 
            alt={user?.name || 'User'}
            src={user?.profileImage}
            sx={{ width: 40, height: 40 }}
          >
            {user?.name?.charAt(0) || <PersonOutlineIcon />}
          </Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={handleProfile}>
            <Avatar />
            {t('auth.profile', 'Profile')}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {t('auth.logout', 'Logout')}
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );

  // Login Button for Desktop
  const loginButton = !isMobile && !isAuthenticated && (
    <Box sx={{ position: 'fixed', top: 16, right: 24, zIndex: 1200 }}>
      <Button
        variant="outlined"
        color="inherit"
        component={RouterLink}
        to="/login"
        startIcon={<LoginIcon />}
        sx={{
          textTransform: 'none',
          borderRadius: 4,
          px: 3,
          py: 1,
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
          },
        }}
      >
        {t('auth.login', 'Login')}
      </Button>
    </Box>
  );

  return (
    <Box component="nav">
      {/* Permanent Drawer for Desktop */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: 250,
              borderRight: 'none',
              boxShadow: 1,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 250,
            borderRight: 'none',
            boxShadow: 3,
          },
        }}
      >
        {drawer}
      </Drawer>
      {mobileAppBar}
      {desktopAppBar}
      {loginButton}
    </Box>
  );
};
