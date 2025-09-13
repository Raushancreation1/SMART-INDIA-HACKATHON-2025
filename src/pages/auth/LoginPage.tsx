import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would make an API call to authenticate
        // For demo purposes, we'll use mock data
        const mockUser = {
          id: '1',
          email: values.email,
          name: 'Demo User',
          role: 'farmer' as const,
          phone: '+1234567890',
        };
        
        login(mockUser);
        navigate(from, { replace: true });
      } catch (err) {
        setError('Failed to log in. Please check your credentials and try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box sx={{
      maxWidth: 480,
      mx: 'auto',
      p: 4,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1,
      mt: { xs: 2, md: 4 },
      mb: 4
    }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography component="h1" variant="h4" sx={{ 
          fontWeight: 'bold',
          mb: 1,
          color: 'primary.main',
          background: 'linear-gradient(45deg, #1976d2, #4caf50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to your Fasalyan account
        </Typography>
      </Box>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 1,
            '& .MuiAlert-message': { width: '100%' }
          }}
        >
          {error}
        </Alert>
      )}
      
      <Box 
        component="form" 
        onSubmit={formik.handleSubmit} 
        noValidate 
        sx={{ 
          '& .MuiTextField-root': { mb: 2 },
          '& .MuiButton-root': {
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 2
            }
          }
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          my: 2,
          '& .MuiFormControlLabel-root': {
            mr: 0
          },
          '& .MuiTypography-root': {
            fontSize: '0.875rem'
          }
        }}>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, mb: 2, py: 1.5 }}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <Divider sx={{ my: 3, '&::before, &::after': { borderColor: 'divider' } }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            or continue with
          </Typography>
        </Divider>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link 
              component={RouterLink} 
              to="/auth/register" 
              variant="body2"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px'
                }
              }}
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
