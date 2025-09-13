import React from 'react';
import { 
  Box, 
  Button,
  Container, 
  Typography, 
  Paper, 
  Grid,
  useTheme,
  styled
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Agriculture as AgricultureIcon,
  Group as GroupIcon,
  EmojiNature as NatureIcon,
  LocalShipping as ShippingIcon,
  EmojiEvents as QualityIcon,
  Spa as SpaIcon,
} from '@mui/icons-material';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
  '& .MuiSvgIcon-root': {
    fontSize: '3.5rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  '& h3': {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
}));

const SectionTitle = styled(Typography)<any>(({ theme }) => ({
  color: theme.palette.primary.dark,
  position: 'relative',
  display: 'inline-block',
  marginBottom: theme.spacing(6),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -theme.spacing(1.5),
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

const AboutPage = () => {
  const theme = useTheme();
  
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        py: 10,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 30%)',
          zIndex: 1,
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            About Fasalyan
          </Typography>
          <Typography 
            variant="h5" 
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Bridging the gap between farmers and buyers for a sustainable future
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Section>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <SectionTitle variant="h3" component="h2">
              Our Mission
            </SectionTitle>
          </Box>
          
          <Paper elevation={0} sx={{ 
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
          }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h3" gutterBottom sx={{ color: theme.palette.primary.dark, fontWeight: 600 }}>
                  Empowering Farmers, Enriching Lives
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  At Fasalyan, we're dedicated to revolutionizing the agricultural supply chain by directly 
                  connecting farmers with buyers. Our platform eliminates middlemen, ensuring fair prices for 
                  farmers and quality produce for buyers.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  We believe in sustainable farming practices and work closely with our farming community to 
                  promote environmentally responsible agriculture while maintaining high-quality standards.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[4],
                  '& img': {
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Farmers in field"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h3" component="h2">
              Why Choose Fasalyan?
            </SectionTitle>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <AgricultureIcon />,
                title: 'Direct from Farm',
                description: 'Get fresh produce directly from local farmers without any middlemen.'
              },
              {
                icon: <GroupIcon />,
                title: 'Support Local',
                description: 'Help support your local farming community and sustainable agriculture.'
              },
              {
                icon: <NatureIcon />,
                title: 'Eco-Friendly',
                description: 'Promote environmentally responsible farming practices.'
              },
              {
                icon: <ShippingIcon />,
                title: 'Fast Delivery',
                description: 'Quick and reliable delivery of fresh produce to your doorstep.'
              },
              {
                icon: <QualityIcon />,
                title: 'Premium Quality',
                description: 'Only the freshest and highest quality produce from trusted farmers.'
              },
              {
                icon: <SpaIcon />,
                title: 'Sustainable',
                description: 'Committed to sustainable and ethical farming practices.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard>
                  {feature.icon}
                  <Typography variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Team Section */}
      <Section>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h3" component="h2">
              Our Team
            </SectionTitle>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
              Meet the dedicated team behind Fasalyan, working tirelessly to revolutionize the agricultural supply chain.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: 'John Doe',
                role: 'CEO & Founder',
                image: 'https://randomuser.me/api/portraits/men/1.jpg'
              },
              {
                name: 'Jane Smith',
                role: 'Head of Operations',
                image: 'https://randomuser.me/api/portraits/women/1.jpg'
              },
              {
                name: 'Robert Johnson',
                role: 'Lead Developer',
                image: 'https://randomuser.me/api/portraits/men/2.jpg'
              },
              {
                name: 'Emily Davis',
                role: 'Customer Support',
                image: 'https://randomuser.me/api/portraits/women/2.jpg'
              }
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{
                  textAlign: 'center',
                  '& img': {
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `4px solid ${theme.palette.primary.light}`,
                    marginBottom: theme.spacing(2),
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  },
                  '& h4': {
                    color: theme.palette.primary.dark,
                    marginBottom: theme.spacing(0.5)
                  },
                  '& p': {
                    color: theme.palette.text.secondary
                  }
                }}>
                  <img src={member.image} alt={member.name} />
                  <Typography variant="h6" component="h4">{member.name}</Typography>
                  <Typography variant="body2" color="primary">{member.role}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.1) 0%, transparent 30%)',
          zIndex: 1,
        },
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to join our farming community?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Whether you're a farmer looking to sell your produce or a buyer looking for fresh, local products,
            we've got you covered.
          </Typography>
          <Box sx={{ '& > *:not(:last-child)': { mr: 2 } }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              component={RouterLink}
              to="/register"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Section>
    </Box>
  );
};

export default AboutPage;
