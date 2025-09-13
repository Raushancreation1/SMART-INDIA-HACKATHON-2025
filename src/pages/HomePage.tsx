import React from 'react';
import { Box, Button, Container, Grid, Typography, Paper, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import TestLanguageSwitch from '../components/common/TestLanguageSwitch';
import SupplyChainProcess from '../components/process/SupplyChainProcess';
import TrustedFarmers from '../components/farmers/TrustedFarmers';
import TrustedBuyers from '../components/buyers/TrustedBuyers';
import Chatbot from '../components/chatbot/Chatbot';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(0, 100, 0, 0.7), rgba(0, 80, 0, 0.7)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: theme.palette.common.white,
  padding: theme.spacing(15, 2),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  boxShadow: theme.shadows[4],
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%)',
    zIndex: 1,
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(15, 4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 4),
    marginBottom: theme.spacing(8),
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  '& h1': {
    fontSize: '2.5rem',
    lineHeight: 1.2,
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.75rem',
    },
  },
  '& h5': {
    fontSize: '1.1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.25rem',
    },
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    background: 'rgba(255, 255, 255, 1)',
  },
  '& .feature-icon': {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1.5),
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
      marginBottom: theme.spacing(2),
    },
  },
  '& h3': {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: '1.1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.25rem',
      marginBottom: theme.spacing(2),
    },
  },
  '& p': {
    fontSize: '0.9rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
  '&:hover .feature-icon': {
    transform: 'scale(1.1)',
  },
}));

const features = [
  {
    title: 'Guaranteed Market',
    description: 'Sell your produce directly to verified buyers at fair prices.',
    icon: '🌱',
  },
  {
    title: 'Fair Pricing',
    description: 'Get the best prices with transparent and competitive bidding.',
    icon: '⚖️',
  },
  {
    title: 'Secure Payments',
    description: 'Safe and timely payments directly to your account.',
    icon: '🔐',
  },
  {
    title: 'Real-time Analytics',
    description: 'Track your sales and performance with detailed analytics.',
    icon: '📊',
  },
  {
    title: 'Direct Communication',
    description: 'Chat directly with buyers to discuss terms and build relationships.',
    icon: '💬',
  },
];

const HomePage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            {t('home.hero.title', 'Welcome to Fasalyan')}
          </Typography>
          <Typography variant="h5" paragraph>
            {t('home.hero.subtitle', 'Connecting farmers directly with buyers for better prices and quality produce')}
          </Typography>
          <Box sx={{ 
            mt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            '& .MuiButton-root': {
              minWidth: 180,
              padding: theme.spacing(1.5, 3),
              fontSize: '1rem',
              [theme.breakpoints.up('sm')]: {
                fontSize: '1.1rem',
              },
            },
          }}>
            <Button 
              component={RouterLink} 
              to="/farmers" 
              variant="contained" 
              color="primary" 
              size="large"
            >
              {t('buttons.find_farmers', 'Find Farmers')}
            </Button>
            <Button 
              component={RouterLink} 
              to="/buyers" 
              variant="outlined" 
              color="inherit" 
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {t('buttons.for_buyers', 'For Buyers')}
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <TestLanguageSwitch />
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {t('home.how_it_works', 'How It Works')}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
          Our platform is designed to make contract farming simple, transparent, and profitable for everyone involved.
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <FeatureCard elevation={3}>
                <Box className="feature-icon">
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {t(`home.features.${index}.title`, feature.title)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t(`home.features.${index}.description`, feature.description)}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box bgcolor={theme.palette.primary.main} color="white" py={8}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to get started?
          </Typography>
          <Typography variant="h6" paragraph>
            Join Fasalyan today and take control of your farming business.
          </Typography>
          <Button
            component={RouterLink}
            to="/auth/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
      
      {/* Chatbot Component */}
      <Chatbot />
      
      {/* Supply Chain Process Section */}
      <SupplyChainProcess />
      
      {/* Trusted Farmers Section */}
      <TrustedFarmers />
      
      {/* Trusted Buyers Section */}
      <TrustedBuyers />
    </Box>
  );
};

export default HomePage;
