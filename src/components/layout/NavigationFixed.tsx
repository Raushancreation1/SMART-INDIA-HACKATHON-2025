import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  List, 
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
  Stack,
  Collapse,
  Button,
  alpha
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as FarmerIcon,
  Store as BuyerIcon,
  Assignment as ContractIcon,
  Assignment as AssignmentIcon,
  Info as AboutIcon,
  ContactMail as ContactIcon,
  Close as CloseIcon,
  Login as LoginIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  PersonOutline as PersonOutlineIcon,
} from '@mui/icons-material';
import logo from '../../assets/images/farmers/farmer-logo.svg';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

interface BaseNavigationItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  exact?: boolean;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
}

interface NavigationItemWithChildren extends BaseNavigationItem {
  children: BaseNavigationItem[];
}

type NavigationItem = BaseNavigationItem | NavigationItemWithChildren;

interface DividerItem {
  divider: true;
  text?: never;
  path?: never;
  icon?: never;
  children?: never;
  authRequired?: never;
  hideWhenAuthed?: never;
}

type NavItem = NavigationItem | DividerItem;

interface NavigationProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isMobile = useMediaQuery('md');
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = useState<{[key: string]: boolean}>({});

  const toggleSubMenu = (key: string) => {
    setOpenSubMenu(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems: Array<NavItem | DividerItem> = [
    { 
      text: t('nav.home', 'Home') as string, 
      path: '/', 
      icon: <HomeIcon />,
      exact: true
    },
    { 
      text: t('nav.farmers', 'Farmers') as string, 
      path: '/farmers', 
      icon: <FarmerIcon /> 
    },
    { 
      text: t('nav.buyers', 'Buyers') as string, 
      path: '/buyers', 
      icon: <BuyerIcon /> 
    },
    { 
      text: t('nav.contracts', 'Contracts') as string, 
      path: '/contracts',
      icon: <ContractIcon />,
      children: [
        { 
          text: t('nav.allContracts', 'All Contracts') as string, 
          path: '/contracts', 
          icon: <AssignmentIcon /> 
        },
        { 
          text: t('nav.newContract', 'New Contract') as string, 
          path: '/contracts/new', 
          icon: <AssignmentIcon />,
          authRequired: true
        },
      ]
    },
    { divider: true },
    { 
      text: t('nav.about', 'About') as string, 
      path: '/about', 
      icon: <AboutIcon /> 
    },
    { 
      text: t('nav.contact', 'Contact') as string, 
      path: '/contact', 
      icon: <ContactIcon /> 
    },
  ];


  const renderNavItem = (item: NavItem, index: number) => {
    if ('divider' in item) {
      return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
    }

    const navItem = item;
    const hasChildren = 'children' in navItem && Array.isArray(navItem.children) && navItem.children.length > 0;
    const isItemActive = isActive(navItem.path, navItem.exact);
    const isSubMenuOpen = openSubMenu[navItem.path] || false;

    const listItemContent = (
      <ListItemButton
        key={navItem.path}
        component={RouterLink}
        to={navItem.path}
        onClick={() => {
          if (isMobile) handleDrawerToggle();
          if (hasChildren) toggleSubMenu(navItem.path);
        }}
        sx={{
          minHeight: 48,
          px: 2.5,
          color: isItemActive ? 'primary.main' : 'text.secondary',
          backgroundColor: isItemActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
          '&:hover': {
            backgroundColor: isItemActive 
              ? alpha(theme.palette.primary.main, 0.12) 
              : theme.palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
          {React.cloneElement(navItem.icon, { 
            style: { 
              fontSize: '1.25rem',
              color: 'inherit'
            } 
          } as React.HTMLAttributes<HTMLElement>)}
        </ListItemIcon>
        <ListItemText 
          primary={navItem.text} 
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: isItemActive ? 600 : 400,
          }}
        />
        {hasChildren && (
          isSubMenuOpen ? <ExpandLess /> : <ExpandMore />
        )}
      </ListItemButton>
    );

    if (!hasChildren) {
      return listItemContent;
    }

    return (
      <React.Fragment key={item.path}>
        {listItemContent}
        <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {hasChildren && 'children' in navItem && navItem.children?.map((child, childIndex) => (
              <ListItemButton
                key={`${navItem.path}-${childIndex}`}
                component={RouterLink}
                to={child.path}
                onClick={() => isMobile && handleDrawerToggle()}
                sx={{
                  pl: 8,
                  minHeight: 40,
                  color: isActive(child.path, true) ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                <ListItemText 
                  primary={child.text} 
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: isActive(child.path, true) ? 500 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={logo} 
            alt="Logo" 
            sx={{ 
              width: 40, 
              height: 40,
              mr: 1,
              bgcolor: 'primary.main',
              '& img': {
                width: '70%',
                height: '70%',
                objectFit: 'contain'
              }
            }} 
          />
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            Fasalyan
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {isAuthenticated && (
        <Box 
          sx={{ 
            p: 2, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.primary.main, 0.02)
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar 
              src={user?.profileImage || undefined}
              alt={user?.name || 'User'}
              sx={{ 
                width: 40, 
                height: 40,
                bgcolor: 'primary.main',
                '& .MuiSvgIcon-root': {
                  fontSize: '1.5rem'
                }
              }}
            >
              {user?.name?.[0]?.toUpperCase() || <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="subtitle2" 
                noWrap 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                {user?.name || 'User'}
              </Typography>
              <Typography 
                variant="caption" 
                noWrap 
                sx={{ 
                  display: 'block',
                  color: 'text.secondary',
                  textTransform: 'capitalize'
                }}
              >
                {user?.role || 'User'}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        <List disablePadding>
          {navItems
            .filter(item => !('authRequired' in item) || (item.authRequired && isAuthenticated))
            .filter(item => !('hideWhenAuthed' in item) || (item.hideWhenAuthed && !isAuthenticated))
            .map(renderNavItem)}
        </List>
      </Box>

      {!isAuthenticated && (
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/auth/register"
            startIcon={<PersonOutlineIcon />}
            onClick={() => isMobile && handleDrawerToggle()}
            sx={{ mb: 1 }}
          >
            {t('auth.register', 'Register')}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            component={RouterLink}
            to="/auth/login"
            startIcon={<LoginIcon />}
            onClick={() => isMobile && handleDrawerToggle()}
          >
            {t('auth.login', 'Login')}
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: 240 },
        flexShrink: { md: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* Mobile drawer */}
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
            width: 280,
            boxShadow: theme.shadows[16],
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 240,
            borderRight: 'none',
            boxShadow: theme.shadows[1],
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navigation;
