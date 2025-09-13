import React from 'react';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Farmer {
  id: number;
  name: string;
  location: string;
  image: string;
  crops: string[];
  rating: number;
  description: string;
}

const TrustedFarmers: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const farmers: Farmer[] = [
    {
      id: 1,
      name: 'Vijay Reddy',
      location: 'Andhra Pradesh, India',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      crops: ['Mangoes', 'Tomatoes', 'Chillies'],
      rating: 4.9,
      description: 'Organic Fruits & Vegetables'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Punjab, India',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      crops: ['Wheat', 'Rice', 'Basmati'],
      rating: 4.8,
      description: 'Organic Wheat & Rice'
    },
    {
      id: 3,
      name: 'Sunita Yadav',
      location: 'Haryana, India',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      crops: ['Spinach', 'Coriander', 'Mint'],
      rating: 4.8,
      description: 'Organic Vegetables & Herbs'
    },
    {
      id: 4,
      name: 'Meena Devi',
      location: 'Uttar Pradesh, India',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      crops: ['Milk', 'Ghee', 'Paneer'],
      rating: 4.7,
      description: 'Dairy Products'
    },
    {
      id: 5,
      name: 'Priya Patel',
      location: 'Gujarat, India',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      crops: ['Cotton', 'Turmeric', 'Cumin'],
      rating: 4.6,
      description: 'Organic Cotton & Spices'
    },
    {
      id: 6,
      name: 'Arjun Singh',
      location: 'Madhya Pradesh, India',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      crops: ['Soybean', 'Mustard', 'Lentils'],
      rating: 4.5,
      description: 'Organic Pulses & Oilseeds'
    }
  ];

  return (
    <Box py={8} bgcolor={theme.palette.background.paper}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {t('farmers.trusted.title', 'Our Trusted Farmers')}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center" paragraph mb={6}>
          {t('farmers.trusted.subtitle', 'Meet the hardworking farmers who bring fresh produce to your table')}
        </Typography>
        
        <Grid container spacing={4}>
          {farmers.map((farmer) => (
            <Grid item xs={12} sm={6} md={3} key={farmer.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '100%' }}>
                  <CardMedia
                    component="img"
                    image={farmer.image}
                    alt={farmer.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h6" component="h3">
                        {farmer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {farmer.location}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" bgcolor={theme.palette.warning.light} px={1} py={0.5} borderRadius={1}>
                      <Box sx={{ color: theme.palette.warning.main }}>★</Box>
                      <Typography variant="body2" ml={0.5} color="text.primary">
                        {farmer.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="primary" fontWeight="medium" mt={1} mb={2}>
                    {farmer.description}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Products:
                  </Typography>
                  <Grid container spacing={1}>
                    {farmer.crops.map((crop, index) => (
                      <Grid item key={index}>
                        <Box 
                          sx={{
                            bgcolor: theme.palette.grey[100],
                            color: theme.palette.text.primary,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            border: `1px solid ${theme.palette.grey[300]}`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {crop}
                        </Box>
                      </Grid>
                    ))}
                    <Grid item>
                      <Box 
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        +{farmer.crops.length} more
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustedFarmers;
