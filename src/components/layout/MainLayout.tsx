import React, { useState } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  useScrollTrigger, 
  Slide, 
  useTheme, 
  useMediaQuery, 
  Button, 
  Container,
  Stack,
  CssBaseline,
  Tabs,
  Tab
} from '@mui/material';
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Store as StoreIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import logo from '../../assets/images/farmers/farmer-logo.svg';
import LanguageSelector from '../common/LanguageSelector';
import { useTranslation } from 'react-i18next';
import Navigation from './NavigationFixed';

interface HideOnScrollProps {
  children: React.ReactElement;
  window?: () => Window;
}

const HideOnScroll: React.FC<HideOnScrollProps> = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

interface MainLayoutProps {
  children?: React.ReactNode;
  window?: () => Window;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  // Add authentication state here when needed
  // const isAuthenticated = false;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState(0);
  const isHomePage = location.pathname === '/';
  
  // Update the active tab based on current route
  React.useEffect(() => {
    const paths = ['/', '/farmers', '/buyers', '/contracts'];
    const index = paths.findIndex(path => location.pathname.startsWith(path));
    if (index !== -1) {
      setValue(index);
    }
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      flexDirection: { xs: 'column', md: 'row' },
      width: '100%',
      overflowX: 'hidden',
    }}>
      <CssBaseline />
      <Navigation mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        <HideOnScroll {...props}>
          <AppBar 
            position="fixed" 
            elevation={isHomePage ? 0 : 4}
            sx={{
              background: isHomePage 
                ? 'linear-gradient(135deg, rgba(46, 125, 50, 0.9) 0%, rgba(27, 94, 32, 0.95) 100%)' 
                : 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
              color: '#ffffff',
              borderBottom: isHomePage ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '& .MuiToolbar-root': {
                paddingTop: { xs: 1, sm: 2 },
                minHeight: { xs: '56px', sm: '64px' },
                px: { xs: 1, sm: 2 },
              }
            }}
          >
            <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3 } }}>
              <Toolbar 
                disableGutters 
                sx={{ 
                  justifyContent: 'space-between', 
                  minHeight: { xs: '56px', sm: '64px' },
                  px: { xs: 1, sm: 2 },
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <img 
                    src={logo} 
                    alt="FarmConnect" 
                    style={{ 
                      height: 40, 
                      marginRight: 10,
                      filter: isHomePage ? 'brightness(0) invert(1)' : 'none'
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    component={RouterLink}
                    to="/"
                    sx={{ 
                      color: isHomePage ? 'white' : 'primary.contrastText',
                      textDecoration: 'none',
                      fontWeight: 700,
                      mr: 3,
                      display: { xs: 'none', sm: 'block' }
                    }}
                  >
                    FarmConnect
                  </Typography>
                  
                  {!isMobile && (
                    <Tabs 
                      value={value}
                      onChange={handleChange}
                      textColor="inherit"
                      sx={{ 
                        mx: 'auto',
                        '& .MuiTabs-flexContainer': {
                          justifyContent: 'center',
                        },
                        '& .MuiTabs-indicator': { 
                          bgcolor: isHomePage ? 'white' : 'primary.main',
                          height: 3,
                          borderRadius: '3px 3px 0 0'
                        },
                        '& .MuiTab-root': { 
                          minWidth: 100,
                          color: isHomePage ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                          textTransform: 'none',
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          '&.Mui-selected': {
                            color: isHomePage ? 'white' : 'primary.main',
                            fontWeight: 600,
                          },
                          '&:hover': {
                            color: isHomePage ? 'white' : 'primary.main',
                            backgroundColor: isHomePage ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                            borderRadius: '8px 8px 0 0',
                          },
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                    >
                      <Tab 
                        icon={<HomeIcon />} 
                        label={t('navigation.home', 'Home')} 
                        component={RouterLink} 
                        to="/"
                        sx={{ 
                          minHeight: 64,
                          '& .MuiSvgIcon-root': {
                            marginBottom: '4px',
                            fontSize: '1.2rem',
                            color: isHomePage ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                            '&.Mui-selected': {
                              color: isHomePage ? 'white' : 'primary.main',
                            },
                          },
                        }}
                      />
                      <Tab 
                        icon={<PersonIcon />} 
                        label={t('navigation.farmers', 'Farmers')} 
                        component={RouterLink} 
                        to="/farmers"
                        sx={{ 
                          minHeight: 64,
                          '& .MuiSvgIcon-root': {
                            marginBottom: '4px',
                            fontSize: '1.2rem',
                            color: isHomePage ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                            '&.Mui-selected': {
                              color: isHomePage ? 'white' : 'primary.main',
                            },
                          },
                        }}
                      />
                      <Tab 
                        icon={<StoreIcon />} 
                        label={t('navigation.buyers', 'Buyers')} 
                        component={RouterLink} 
                        to="/buyers"
                        sx={{ 
                          minHeight: 64,
                          '& .MuiSvgIcon-root': {
                            marginBottom: '4px',
                            fontSize: '1.2rem',
                            color: isHomePage ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                            '&.Mui-selected': {
                              color: isHomePage ? 'white' : 'primary.main',
                            },
                          },
                        }}
                      />
                      <Tab 
                        icon={<AssignmentIcon />} 
                        label={t('navigation.contracts', 'Contracts')} 
                        component={RouterLink} 
                        to="/contracts"
                        sx={{ 
                          minHeight: 64,
                          '& .MuiSvgIcon-root': {
                            marginBottom: '4px',
                            fontSize: '1.2rem',
                            color: isHomePage ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                            '&.Mui-selected': {
                              color: isHomePage ? 'white' : 'primary.main',
                            },
                          },
                        }}
                      />
                    </Tabs>
                  )}
                </Box>
                
                <Stack direction="row" spacing={2} alignItems="center">
                  <LanguageSelector />
                  <Button 
                    color={isHomePage ? 'inherit' : 'primary'}
                    variant={isHomePage ? 'outlined' : 'contained'}
                    component={RouterLink} 
                    to="/login" 
                    startIcon={<LoginIcon />}
                    sx={{ 
                      borderColor: isHomePage ? 'rgba(255, 255, 255, 0.5)' : 'primary.main',
                      '&:hover': { 
                        borderColor: isHomePage ? 'white' : 'primary.dark',
                        bgcolor: isHomePage ? 'rgba(255, 255, 255, 0.1)' : 'primary.dark'
                      },
                      color: isHomePage ? 'white' : 'white',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      borderRadius: 2,
                      boxShadow: isHomePage ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {t('auth.login', 'Login')}
                  </Button>
                </Stack>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
        
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box 
          sx={{
            flexGrow: 1,
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 },
            backgroundColor: 'background.default',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          <Container 
            maxWidth={false} 
            disableGutters
            sx={{
              maxWidth: '100%',
              px: { xs: 0, sm: 2 },
              '& > *': {
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden',
              },
            }}
          >
            {children || <Outlet />}
          </Container>
        </Box>
        
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            px: 2, 
            mt: 'auto', 
            backgroundColor: (theme) => theme.palette.grey[200],
            textAlign: 'center'
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary">
              {new Date().getFullYear()} Fasalyan. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
