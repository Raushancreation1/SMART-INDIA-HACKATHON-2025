import React from 'react';
import { Card, CardActionArea, CardMedia, Typography, Box } from '@mui/material';

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
  onClick: () => void;
  isSelected: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  name, 
  image, 
  count, 
  onClick,
  isSelected 
}) => {
  return (
    <Card 
      elevation={isSelected ? 4 : 1}
      sx={{ 
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: isSelected ? `2px solid` : 'none',
        borderColor: 'primary.main',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <Box sx={{ position: 'relative', height: 140, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            sx={{
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
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Typography 
              variant="h6" 
              component="div" 
              color="white" 
              fontWeight="bold"
              sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
            >
              {name}
            </Typography>
            <Typography 
              variant="body2" 
              color="rgba(255,255,255,0.9)"
              sx={{ 
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              {count} {count === 1 ? 'farmer' : 'farmers'} available
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
