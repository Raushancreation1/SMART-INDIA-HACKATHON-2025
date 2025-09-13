import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // Primary colors - Teal
    primary: {
      main: '#00897b', // Teal
      light: '#33a095',
      dark: '#005f56',
      contrastText: '#ffffff',
    },
    // Secondary colors - Blue
    secondary: {
      main: '#4a6fa5',
      light: '#7d9dcc',
      dark: '#1a4477',
      contrastText: '#ffffff',
    },
    // Status colors
    success: {
      main: '#43a047', // Green
      light: '#76d275',
      dark: '#00701a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1', // Blue
      light: '#5eb8ff',
      dark: '#005b9f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffa000', // Amber
      light: '#ffd149',
      dark: '#c67100',
      contrastText: '#000000',
    },
    error: {
      main: '#d32f2f', // Red
      light: '#ff6659',
      dark: '#9a0007',
      contrastText: '#ffffff',
    },
    // Background colors
    background: {
      default: '#f5f7fa', // Light blue-grey
      paper: '#ffffff',
    },
    // Text colors
    text: {
      primary: '#263238', // Dark blue-grey
      secondary: '#546e7a',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      active: '#1b5e20',
      hover: 'rgba(84, 214, 44, 0.08)',
      selected: 'rgba(84, 214, 44, 0.16)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    // Button Styles
    MuiButton: {
      styleOverrides: {
        // Base button styles
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          transition: 'all 0.3s ease',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        // Primary Buttons - Teal gradient with hover
        containedPrimary: {
          background: 'linear-gradient(45deg, #00897b 0%, #33a095 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00796b 0%, #2d8b82 100%)',
            boxShadow: '0 4px 12px rgba(0, 137, 123, 0.3)',
          },
        },
        // Secondary Buttons - Blue gradient with hover
        containedSecondary: {
          background: 'linear-gradient(45deg, #4a6fa5 0%, #7d9dcc 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #3a5f95 0%, #6d8dbc 100%)',
            boxShadow: '0 4px 12px rgba(74, 111, 165, 0.3)',
          },
        },
        // Outlined Buttons - Clean border with subtle hover
        outlined: {
          border: '2px solid',
          '&.MuiButton-outlinedPrimary': {
            color: 'primary.main',
            borderColor: 'currentColor',
            '&:hover': {
              backgroundColor: 'rgba(0, 137, 123, 0.08)',
              borderColor: 'primary.dark',
            },
          },
          '&.MuiButton-outlinedSecondary': {
            color: 'secondary.main',
            borderColor: 'currentColor',
            '&:hover': {
              backgroundColor: 'rgba(74, 111, 165, 0.08)',
              borderColor: 'secondary.dark',
            },
          },
        },
        // Text Buttons - Simple and accessible
        text: {
          '&.MuiButton-textPrimary': {
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(0, 137, 123, 0.08)',
            },
          },
          '&.MuiButton-textSecondary': {
            color: 'secondary.main',
            '&:hover': {
              backgroundColor: 'rgba(74, 111, 165, 0.08)',
            },
          },
        },
      },
    },
    // Cards & Containers
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(0,0,0,0.05)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            borderColor: 'rgba(0, 137, 123, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        },
        outlined: {
          border: '1px solid rgba(0, 0, 0, 0.12)',
        },
        elevation1: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        },
      },
    },
    // App Bar
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #ffffff 0%, #f5f7fa 100%)',
          color: '#263238',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          '& .MuiToolbar-root': {
            minHeight: 64,
          },
          '& .MuiButton-root': {
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
        colorPrimary: {
          backgroundColor: '#ffffff',
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
    // Chips & Tags
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          height: 32,
          '& .MuiChip-label': {
            paddingLeft: 12,
            paddingRight: 12,
          },
          '& .MuiChip-icon': {
            marginLeft: 8,
            marginRight: -4,
          },
          '& .MuiChip-deleteIcon': {
            marginRight: 4,
            marginLeft: -4,
            color: 'inherit',
            opacity: 0.7,
            '&:hover': {
              opacity: 1,
            },
          },
        },
        // Primary Chips - Teal
        colorPrimary: {
          backgroundColor: 'rgba(0, 137, 123, 0.1)',
          color: 'primary.dark',
          border: '1px solid rgba(0, 137, 123, 0.2)',
          '&:hover, &:focus': {
            backgroundColor: 'rgba(0, 137, 123, 0.15)',
          },
        },
        // Secondary Chips - Blue
        colorSecondary: {
          backgroundColor: 'rgba(74, 111, 165, 0.1)',
          color: 'secondary.dark',
          border: '1px solid rgba(74, 111, 165, 0.2)',
          '&:hover, &:focus': {
            backgroundColor: 'rgba(74, 111, 165, 0.15)',
          },
        },
        // Outlined Chips
        outlined: {
          backgroundColor: 'transparent',
          '&.MuiChip-colorPrimary': {
            color: 'primary.main',
            borderColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(0, 137, 123, 0.05)',
            },
          },
          '&.MuiChip-colorSecondary': {
            color: 'secondary.main',
            borderColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'rgba(74, 111, 165, 0.05)',
            },
          },
        },
      },
    },
    // Form Inputs
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 2px rgba(0, 137, 123, 0.2)',
              borderWidth: '1px',
            },
            '&.Mui-error': {
              '& fieldset': {
                borderColor: '#d32f2f',
              },
              '&:hover fieldset': {
                borderColor: '#d32f2f',
              },
              '&.Mui-focused fieldset': {
                boxShadow: '0 0 0 2px rgba(211, 47, 47, 0.2)',
              },
            },
          },
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            '&.Mui-error': {
              color: '#d32f2f',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'primary.main',
          },
          '&.Mui-error': {
            color: '#d32f2f',
          },
        },
      },
    },
  },
});

export default theme;
