import React from 'react';
import { Box, Container, Grid, Typography, Paper, useTheme, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  Grade as GradeIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  DeliveryDining as DeliveryIcon,
} from '@mui/icons-material';
// High-quality images from Unsplash with consistent aspect ratio (16:9)
const processImages = {
  sourcing: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  sorting: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  grading: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  packaging: 'https://images.unsplash.com/photo-1514944984940-2a1f80b6f3a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  dispatch: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  delivery: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
};

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const SupplyChainProcess: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const ProcessStepCard = styled(Paper)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    boxShadow: theme.shadows[2],
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[6],
      '& .process-image': {
        transform: 'scale(1.05)',
      },
    },
  }));

  const processSteps: ProcessStep[] = [
    {
      icon: <SearchIcon />,
      title: t('process.sourcing.title', 'Sourcing'),
      description: t('process.sourcing.description', 'Directly source fresh produce from verified farmers with full transparency and fair pricing.'),
      image: processImages.sourcing,
      alt: 'Farmers harvesting fresh produce in the field'
    },
    {
      icon: <SortIcon />,
      title: t('process.sorting.title', 'Sorting'),
      description: t('process.sorting.description', 'Careful sorting to ensure only the best quality produce moves forward.'),
      image: processImages.sorting,
      alt: 'Workers sorting fresh vegetables'
    },
    {
      icon: <GradeIcon />,
      title: t('process.grading.title', 'Grading'),
      description: t('process.grading.description', 'Professional grading according to industry standards and quality parameters.'),
      image: processImages.grading,
      alt: 'Fresh produce being graded by experts'
    },
    {
      icon: <InventoryIcon />,
      title: t('process.packaging.title', 'Packaging'),
      description: t('process.packaging.description', 'Safe and sustainable packaging to maintain freshness and quality.'),
      image: processImages.packaging,
      alt: 'Fresh produce being packaged'
    },
    {
      icon: <ShippingIcon />,
      title: t('process.dispatch.title', 'Dispatch'),
      description: t('process.dispatch.description', 'Efficient dispatch system ensuring timely delivery to your location.'),
      image: processImages.dispatch,
      alt: 'Packages being loaded for dispatch'
    },
    {
      icon: <DeliveryIcon />,
      title: t('process.delivery.title', 'Delivery'),
      description: t('process.delivery.description', 'Reliable and timely delivery to your doorstep with care.'),
      image: processImages.delivery,
      alt: 'Happy customer receiving fresh produce'
    },
  ];

  return (
    <Box sx={{ 
      py: { xs: 6, md: 10 },
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: `linear-gradient(180deg, ${theme.palette.primary.light}10 0%, ${theme.palette.primary.light}01 100%)`,
        zIndex: 0,
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2
            }}
          >
            {t('process.title', 'Our Supply Chain Process')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            {t('process.subtitle', 'From farm to your doorstep with care, transparency, and efficiency')}
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <ProcessStepCard>
                <Box sx={{ 
                  position: 'relative',
                  height: 200,
                  overflow: 'hidden',
                  '&:hover img': {
                    transform: 'scale(1.05)'
                  }
                }}>
                  <img 
                    src={step.image} 
                    alt={step.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease-in-out'
                    }}
                  />
                </Box>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '-30px auto 20px',
                    color: 'white',
                    boxShadow: theme.shadows[3],
                    '& svg': {
                      fontSize: '1.8rem'
                    }
                  }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {step.description}
                  </Typography>
                </Box>
              </ProcessStepCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SupplyChainProcess;
