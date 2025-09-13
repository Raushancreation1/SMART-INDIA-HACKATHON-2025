import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Container, CssBaseline, Paper, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/images/farmers/farmer-logo.svg';

const AuthPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 500,
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
    >
      <CssBaseline />
      <Container 
        component="main" 
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
          px: { xs: 2, sm: 3 },
        }}
      >
        <AuthPaper elevation={3}>
          <Box mb={4} textAlign="center">
            <Box 
              component="img"
              src={logo}
              alt="Fasalyan Logo"
              sx={{ 
                height: 60,
                width: 'auto',
                mb: 2
              }}
            />
            <Typography component="h1" variant="h4" fontWeight="bold" color="primary" gutterBottom>
              Fasalyan
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Connecting Farmers with Buyers
            </Typography>
          </Box>
          <Outlet />
          <Box mt={3} textAlign="center">
            <Link component={RouterLink} to="/" variant="body2">
              Back to home
            </Link>
          </Box>
        </AuthPaper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
