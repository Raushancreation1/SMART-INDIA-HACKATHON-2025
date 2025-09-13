import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
  cursor: 'pointer',
}));

const CategoryMedia = styled(CardMedia)({
  height: 160,
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CategoryContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

interface Category {
  id: string | number;
  name: string;
  image: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string | number | null;
  onSelectCategory: (categoryId: string | number | null) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  selectedCategory,
  onSelectCategory 
}) => {

  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 600, 
          color: 'primary.dark',
          mb: 4,
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: 80,
            height: 4,
            backgroundColor: 'primary.main',
            margin: '16px auto 0',
            borderRadius: 2
          }
        }}
      >
        Browse by Category
      </Typography>
      
      <Typography 
        variant="subtitle1" 
        align="center" 
        color="text.secondary" 
        sx={{ 
          mb: 4, 
          maxWidth: 700, 
          mx: 'auto',
          px: 2
        }}
      >
        Discover farmers by their specialties and connect with the best agricultural producers in your region
      </Typography>
      
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={2.4} 
            key={category.id}
            onClick={() => onSelectCategory(category.id === selectedCategory ? null : category.id)}
          >
            <CategoryCard 
              elevation={category.id === selectedCategory ? 4 : 1}
              sx={{
                border: category.id === selectedCategory ? `2px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <CategoryMedia
                image={category.image}
                title={category.name}
              />
              <CategoryContent>
                <Typography variant="subtitle1" component="h3" fontWeight={600} gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.count} {category.count === 1 ? 'farmer' : 'farmers'}
                </Typography>
              </CategoryContent>
            </CategoryCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryGrid;
