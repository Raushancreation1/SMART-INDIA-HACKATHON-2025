import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Tooltip } from '@mui/material';
import { LocationOn, Star, VerifiedUser, CheckCircle } from '@mui/icons-material';

interface FarmerCardProps {
  name: string;
  location: string;
  rating: number;
  specialty: string;
  image: string;
  products: string[];
  experience?: string;
  farmSize?: string;
  certification?: string;
  verified?: boolean;
  variant?: 'vertical' | 'horizontal';
}

const FarmerCard: React.FC<FarmerCardProps> = ({ 
  name, 
  location, 
  rating, 
  specialty, 
  image, 
  products,
  experience,
  farmSize,
  certification,
  verified = false,
  variant = 'vertical' 
}) => {
  // Generate a consistent background color based on the farmer's name
  const stringToColor = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 85%)`;
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Verified Badge */}
      {verified && (
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: 10,
            zIndex: 1,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2,
          }}
        >
          <VerifiedUser fontSize="small" />
        </Box>
      )}
      
      {/* Farmer Image */}
      <Box 
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
          bgcolor: stringToColor(name),
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 1,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
            color: 'white',
          }}
        >
          <Box display="flex" alignItems="center">
            <Star sx={{ color: '#ffc107', mr: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              {rating}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Farmer Details */}
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box mb={1}>
          <Typography variant="h6" component="h3" noWrap>
            {name}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={1}>
          <LocationOn color="action" fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {location}
          </Typography>
        </Box>
        
        {specialty && (
          <Typography variant="body2" color="primary" fontWeight="medium" mb={2}>
            {specialty}
          </Typography>
        )}
        
        {(experience || farmSize) && (
          <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            {experience && (
              <Tooltip title="Years of Experience">
                <Box display="flex" alignItems="center" color="text.secondary">
                  <Box component="span" sx={{ fontSize: '0.75rem', mr: 0.5 }}>👨‍🌾</Box>
                  <Typography variant="caption">{experience}</Typography>
                </Box>
              </Tooltip>
            )}
            {farmSize && (
              <Tooltip title="Farm Size">
                <Box display="flex" alignItems="center" color="text.secondary">
                  <Box component="span" sx={{ fontSize: '0.75rem', mr: 0.5 }}>🌱</Box>
                  <Typography variant="caption">{farmSize}</Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
        )}
        
        {certification && (
          <Chip 
            icon={<CheckCircle fontSize="small" />}
            label={certification}
            size="small"
            color="success"
            variant="outlined"
            sx={{ 
              mb: 2,
              fontSize: '0.65rem',
              height: 24,
              '& .MuiChip-icon': {
                fontSize: '1rem',
                ml: 0.5,
              },
            }}
          />
        )}
        
        <Box mt="auto">
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Products:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {products.slice(0, 4).map((product: string, index: number) => (
              <Chip 
                key={index}
                label={product}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.65rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
            {products.length > 4 && (
              <Tooltip title={products.slice(4).join(', ')}>
                <Chip 
                  label={`+${products.length - 4} more`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.65rem',
                    height: 24,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FarmerCard;
