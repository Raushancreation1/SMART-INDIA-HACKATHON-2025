import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  useTheme, 
  Chip, 
  Tooltip,
  IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocationOn, Business, Star, Phone, Email } from '@mui/icons-material';

interface Buyer {
  id: number;
  name: string;
  company: string;
  image: string;
  location: string;
  category: string;
  rating: number;
  products: string[];
  yearsActive: number;
  phone: string;
  email: string;
  companyLogo?: string;
}

const TrustedBuyers: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const buyers: Buyer[] = [
    {
      id: 1,
      name: 'Aarav Sharma',
      company: 'FreshMart Retail',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      companyLogo: 'https://img.icons8.com/color/96/shop.png',
      location: 'Mumbai, India',
      category: 'Retail Chain',
      rating: 4.8,
      yearsActive: 8,
      products: ['Vegetables', 'Fruits', 'Dairy', 'Grains'],
      phone: '+91 98765 43210',
      email: 'aarav@freshmart.com'
    },
    {
      id: 2,
      name: 'Neha Patel',
      company: 'Organic Bites',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      companyLogo: 'https://img.icons8.com/color/96/organic-food.png',
      location: 'Bangalore, India',
      category: 'Organic Store',
      rating: 4.9,
      yearsActive: 5,
      products: ['Organic Vegetables', 'Herbs', 'Superfoods', 'Cold Pressed Oils'],
      phone: '+91 98765 43211',
      email: 'neha@organicbites.in'
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      company: 'Farm2Table',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      companyLogo: 'https://img.icons8.com/color/96/restaurant.png',
      location: 'Delhi, India',
      category: 'Restaurant Chain',
      rating: 4.7,
      yearsActive: 12,
      products: ['Seasonal Produce', 'Meat', 'Seafood', 'Dairy'],
      phone: '+91 98765 43212',
      email: 'rahul@farm2table.com'
    },
    {
      id: 4,
      name: 'Priya Singh',
      company: 'Green Basket',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      companyLogo: 'https://img.icons8.com/color/96/grocery-store.png',
      location: 'Hyderabad, India',
      category: 'Grocery Chain',
      rating: 4.6,
      yearsActive: 10,
      products: ['Groceries', 'Fresh Produce', 'Beverages', 'Snacks'],
      phone: '+91 98765 43213',
      email: 'priya@greenbasket.com'
    }
  ];

  // Helper function to generate color from string
  const stringToColor = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 90%)`;
  };

  return (
    <Box py={8} bgcolor={theme.palette.background.default}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
            '&::after': {
              content: '""',
              display: 'block',
              width: 80,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              margin: '16px auto 0',
              borderRadius: 2
            }
          }}
        >
          {t('buyers.trusted.title', 'Our Trusted Buyers')}
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          align="center" 
          paragraph 
          mb={6}
          sx={{
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          {t('buyers.trusted.subtitle', 'Connecting farmers with trusted buyers across India')}
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {buyers.map((buyer) => (
            <Grid item xs={12} sm={6} lg={3} key={buyer.id}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
                    '& .buyer-image': {
                      transform: 'scale(1.05)'
                    }
                  },
                }}
              >
                {/* Header with image and company logo */}
                <Box sx={{ 
                  position: 'relative',
                  height: 200,
                  overflow: 'hidden',
                  bgcolor: stringToColor(buyer.name)
                }}>
                  <Box
                    className="buyer-image"
                    component="img"
                    src={buyer.image}
                    alt={buyer.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  
                  {/* Company logo */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -24,
                      right: 16,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      p: 1,
                      boxShadow: 2,
                      overflow: 'hidden',
                      border: '3px solid white'
                    }}
                  >
                    <Box
                      component="img"
                      src={buyer.companyLogo}
                      alt={buyer.company}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  
                  {/* Rating badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: 'rgba(255,255,255,0.9)',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 4,
                      boxShadow: 1
                    }}
                  >
                    <Star sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
                    <Typography variant="body2" fontWeight="bold">
                      {buyer.rating}
                    </Typography>
                  </Box>
                </Box>
                
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  pt: 4
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 700,
                        mr: 1
                      }}
                    >
                      {buyer.name}
                    </Typography>
                    
                    <Tooltip title={`${buyer.yearsActive}+ years in business`}>
                      <Typography 
                        variant="caption" 
                        sx={{
                          bgcolor: 'success.light',
                          color: 'success.dark',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: 600,
                          fontSize: '0.6rem',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5
                        }}
                      >
                        {buyer.yearsActive} Yrs
                      </Typography>
                    </Tooltip>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Business color="action" fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                    <Typography 
                      variant="subtitle2" 
                      color="primary" 
                      fontWeight={600}
                      noWrap
                      sx={{ 
                        textOverflow: 'ellipsis',
                        maxWidth: 'calc(100% - 30px)'
                      }}
                    >
                      {buyer.company}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <LocationOn color="action" fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                    <Typography variant="body2" color="text.secondary">
                      {buyer.location}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                      Business Category:
                    </Typography>
                    <Chip 
                      label={buyer.category}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ 
                        fontSize: '0.7rem',
                        height: 24,
                        '& .MuiChip-label': {
                          px: 1,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                      Products Needed:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {buyer.products.slice(0, 3).map((product, index) => (
                        <Chip 
                          key={index}
                          label={product}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.6rem',
                            height: 22,
                            '& .MuiChip-label': {
                              px: 0.75,
                            },
                          }}
                        />
                      ))}
                      {buyer.products.length > 3 && (
                        <Tooltip title={buyer.products.slice(3).join(', ')}>
                          <Chip 
                            label={`+${buyer.products.length - 3} more`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.6rem',
                              height: 22,
                              '& .MuiChip-label': {
                                px: 0.75,
                              },
                            }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                  
                  <Box mt="auto" pt={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Tooltip title={`Call ${buyer.name}`}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          sx={{
                            bgcolor: 'action.hover',
                            '&:hover': {
                              bgcolor: 'action.selected'
                            }
                          }}
                        >
                          <Phone fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title={`Email ${buyer.name}`}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          sx={{
                            bgcolor: 'action.hover',
                            '&:hover': {
                              bgcolor: 'action.selected'
                            }
                          }}
                        >
                          <Email fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{
                          ml: 'auto',
                          fontSize: '0.7rem',
                          fontStyle: 'italic'
                        }}
                      >
                        Member since {new Date().getFullYear() - buyer.yearsActive}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box mt={6} textAlign="center">
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontWeight: 500
            }}
          >
            {t('buyers.trusted.join', 'Want to join our network of trusted buyers?')}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              maxWidth: '600px',
              mx: 'auto',
              mb: 3
            }}
          >
            Connect with farmers directly and source the freshest produce for your business.
          </Typography>
          <Chip 
            label="Become a Buyer"
            variant="outlined"
            color="primary"
            clickable
            sx={{
              px: 2,
              py: 1,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white'
              }
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TrustedBuyers;
