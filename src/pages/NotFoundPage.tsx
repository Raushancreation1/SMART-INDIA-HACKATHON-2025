import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  ErrorOutline as ErrorOutlineIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6, 
          mt: 8, 
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Box sx={{ color: theme.palette.error.main, mb: 3 }}>
          <ErrorOutlineIcon sx={{ fontSize: 80 }} />
        </Box>
        
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          The requested URL was not found on this server. You may have mistyped the address or the page may have been moved.
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: 'none' }}
          >
            Go Back
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none' }}
          >
            Go to Homepage
          </Button>
        </Box>
        
        <Box sx={{ mt: 6, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" color="text.secondary">
            If you believe this is an error, please contact our support team for assistance.
          </Typography>
          <Button 
            variant="text" 
            size="small" 
            onClick={() => navigate('/contact')}
            sx={{ mt: 1 }}
          >
            Contact Support
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
