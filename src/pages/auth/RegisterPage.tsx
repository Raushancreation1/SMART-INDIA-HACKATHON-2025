import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  userType: Yup.string()
    .oneOf(['farmer', 'buyer'], 'Please select a valid user type')
    .required('Please select a user type'),
  phone: Yup.string().matches(
    /^[0-9]{10}$/,
    'Phone number must be 10 digits'
  ),
});

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'farmer',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would make an API call to register the user
        // For demo purposes, we'll create a mock user and log them in
        const mockUser = {
          id: '1',
          email: values.email,
          name: values.name,
          role: values.userType as 'farmer' | 'buyer',
          phone: values.phone,
        };
        
        login(mockUser);
        navigate(`/${values.userType}`, { replace: true });
      } catch (err) {
        setError('Failed to create an account. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box sx={{
      maxWidth: 600,
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
          Join Fasalyan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create your account as a farmer or buyer
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
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          margin="normal"
          fullWidth
          id="phone"
          label="Phone Number (Optional)"
          name="phone"
          autoComplete="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
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
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl component="fieldset" sx={{ 
          mt: 1, 
          mb: 2,
          width: '100%',
          '& .MuiFormLabel-root': {
            color: 'text.primary',
            mb: 1.5,
            fontWeight: 500
          },
          '& .MuiRadio-root': {
            padding: '8px',
            color: 'action.active',
            '&.Mui-checked': {
              color: 'primary.main'
            }
          },
          '& .MuiTypography-root': {
            fontSize: '0.9375rem'
          }
        }}>
          <FormLabel component="legend">I am a</FormLabel>
          <RadioGroup
            row
            aria-label="user type"
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            sx={{
              gap: 2,
              '& .MuiFormControlLabel-root': {
                flex: 1,
                m: 0,
                p: 1.5,
                border: '1px solid',
                borderColor: formik.values.userType === 'farmer' ? 'primary.main' : 'divider',
                borderRadius: 2,
                bgcolor: formik.values.userType === 'farmer' ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                transition: 'all 0.2s ease-in-out',
                '&:first-of-type': {
                  borderColor: formik.values.userType === 'buyer' ? 'primary.main' : 'divider',
                  bgcolor: formik.values.userType === 'buyer' ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                },
                '&:hover': {
                  borderColor: 'primary.light',
                  bgcolor: 'action.hover'
                }
              }
            }}
          >
            <FormControlLabel
              value="farmer"
              control={<Radio />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography variant="subtitle2" component="div">Farmer</Typography>
                  <Typography variant="caption" color="text.secondary">Selling crops and produce</Typography>
                </Box>
              }
              sx={{ m: 0 }}
            />
            <FormControlLabel
              value="buyer"
              control={<Radio />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography variant="subtitle2" component="div">Buyer/Processor</Typography>
                  <Typography variant="caption" color="text.secondary">Buying agricultural products</Typography>
                </Box>
              }
              sx={{ m: 0 }}
            />
          </RadioGroup>
        </FormControl>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <Divider sx={{ my: 3, '&::before, &::after': { borderColor: 'divider' } }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            Already have an account?
          </Typography>
        </Divider>
        
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link 
              component={RouterLink} 
              to="/auth/login" 
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
              Sign in to your account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
