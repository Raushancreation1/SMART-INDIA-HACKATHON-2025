import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Paper
} from '@mui/material';
import { 
  Search as SearchIcon,
  Tune as TuneIcon,
  Close as CloseIcon,
  LocationOn as LocationOnIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material';
import FarmerCard from '../../components/farmers/FarmerCard';
import FarmerLogo from '../../components/common/FarmerLogo';

// Types
// Types moved to types/farmer.ts


// Styled components
// Nature & Freshness - Light green background
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: '0 0 2rem',
  position: 'relative',
  background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), 
              url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  '&::before, &::after': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  '&::before': {
    background: `
      /* Farmers Section - Left side */
      linear-gradient(
        90deg,
        rgba(232, 245, 233, 0.9) 0%,
        rgba(232, 245, 233, 0.9) 50%,
        rgba(227, 242, 253, 0.9) 50%,
        rgba(227, 242, 253, 0.9) 100%
      ),
      /* Base pattern */
      linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)
    `,
  },
  '&::after': {
    background: `
      /* Farmers side pattern */
      radial-gradient(circle at 20% 30%, rgba(165, 214, 167, 0.15) 0%, transparent 20%),
      /* Buyers side pattern */
      radial-gradient(circle at 80% 70%, rgba(100, 181, 246, 0.15) 0%, transparent 20%)
    `,
    backgroundPosition: 'left, right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50% 100%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 0 1rem',
    '&::before, &::after': {
      backgroundSize: '100% 50%',
      backgroundPosition: 'top, bottom',
    },
  },
}));

// Soil & Tradition - Earthy brown hero section
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(74, 124, 89, 0.85), rgba(74, 124, 89, 0.8)), url('https://source.unsplash.com/random/1920x600/?farm,agriculture')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  padding: theme.spacing(12, 0, 8),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(245, 240, 230, 0.2)', // Earthy beige overlay
    zIndex: 0,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0, 6),
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

// Clean white container for search and filters
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

// Growth & Optimism - Yellow accent for cards and buttons
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff8dc', // Soft yellow
  color: '#2e7d32', // Dark green text
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f0c6', // Slightly darker yellow on hover
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    transform: 'translateY(-1px)',
  },
  '&.MuiButton-contained': {
    backgroundColor: '#4a7c59', // Dark green from hero section
    color: '#fff8dc', // Soft yellow text
    '&:hover': {
      backgroundColor: '#3a6348', // Darker green on hover
    },
  },
}));

// Update toggle buttons for view mode
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '8px !important',
    border: '1px solid',
    borderColor: theme.palette.divider,
    '&:not(:first-of-type)': {
      borderLeft: '1px solid',
      borderColor: theme.palette.divider,
      marginLeft: '0 !important',
    },
    '&.Mui-selected': {
      backgroundColor: '#4a7c59', // Dark green
      color: '#fff8dc', // Soft yellow text
      '&:hover': {
        backgroundColor: '#3a6348', // Darker green
      },
    },
  },
}));

// Categories data with images - defined as allCategories to avoid duplicates

// Update category counts based on farmer data
const updateCategoryCounts = (farmers: any[]) => {
  return allCategories.map(category => {
    if (category.id === 'all') {
      return { ...category, count: farmers.length };
    }
    const count = farmers.filter(farmer => 
      farmer.products?.some((p: string) => 
        p.toLowerCase().includes(category.id.toLowerCase())
      )
    ).length;
    return { ...category, count };
  });
};

// Sample farmer data with high-quality images
const farmers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Punjab, India',
    rating: 4.8,
    specialty: 'Organic Wheat & Rice',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: ['Wheat', 'Rice', 'Basmati', 'Lentils', 'Chickpeas'],
    experience: '12 years',
    farmSize: '15 acres',
    certification: 'Organic Certified',
    verified: true
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Gujarat, India',
    rating: 4.6,
    specialty: 'Organic Cotton & Spices',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: ['Cotton', 'Turmeric', 'Cumin', 'Peanuts', 'Sesame'],
    experience: '8 years',
    farmSize: '8 acres',
    certification: 'Fair Trade Certified',
    verified: true
  },
  {
    id: 3,
    name: 'Vijay Reddy',
    location: 'Andhra Pradesh, India',
    rating: 4.9,
    specialty: 'Organic Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: ['Mangoes', 'Tomatoes', 'Chillies', 'Bananas', 'Oranges'],
    experience: '15 years',
    farmSize: '25 acres',
    certification: 'Organic Certified',
    verified: true
  },
  {
    id: 4,
    name: 'Meena Devi',
    location: 'Uttar Pradesh, India',
    rating: 4.7,
    specialty: 'Dairy Products',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: ['Milk', 'Ghee', 'Paneer', 'Yogurt', 'Butter'],
    experience: '10 years',
    farmSize: '5 acres',
    certification: 'A2 Milk Certified',
    verified: true
  },
  {
    id: 5,
    name: 'Arjun Singh',
    location: 'Madhya Pradesh, India',
    rating: 4.5,
    specialty: 'Organic Pulses & Oilseeds',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: ['Soybean', 'Mustard', 'Lentils', 'Peas', 'Sesame'],
    experience: '18 years',
    farmSize: '30 acres',
    certification: 'Organic Certified',
    verified: true
  },
  {
    id: 6,
    name: 'Sunita Yadav',
    location: 'Haryana, India',
    rating: 4.8,
    specialty: 'Organic Vegetables & Herbs',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: ['Spinach', 'Coriander', 'Mint', 'Fenugreek', 'Bitter Gourd'],
    experience: '7 years',
    farmSize: '6 acres',
    certification: 'Pesticide Free'
  }
];

// Categories with better images and counts
const allCategories = [
  { 
    id: 'all',
    name: 'All Farmers', 
    image: 'https://source.unsplash.com/random/600x400/?farm,agriculture',
    count: 0
  },
  { 
    id: 'grains',
    name: 'Grains', 
    image: 'https://source.unsplash.com/random/600x400/?wheat,rice',
    count: 0,
    icon: '🌾'
  },
  { 
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://source.unsplash.com/random/600x400/?organic,vegetables',
    count: 3,
    icon: '🥬'
  },
  { 
    id: 'fruits',
    name: 'Fruits',
    image: 'https://source.unsplash.com/random/600x400/?fruits,orchard',
    count: 2,
    icon: '🍎'
  },
  { 
    id: 'dairy',
    name: 'Dairy',
    image: 'https://source.unsplash.com/random/600x400/?dairy,farm',
    count: 1,
    icon: '🥛'
  },
  { 
    id: 'spices',
    name: 'Spices',
    image: 'https://source.unsplash.com/random/600x400/?spices,herbs',
    count: 2,
    icon: '🌿'
  },
  { 
    id: 'pulses',
    name: 'Pulses',
    image: 'https://source.unsplash.com/random/400x300/?lentils,beans',
    count: 3,
    icon: '🌱'
  },
  { 
    id: 'oilseeds',
    name: 'Oilseeds',
    image: 'https://source.unsplash.com/random/400x300/?mustard,sunflower',
    count: 2,
    icon: '🌻'
  }
];


type ViewType = 'grid' | 'list';

const FarmersPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [view, setView] = useState<ViewType>('grid');
  const [categories] = useState(() => updateCategoryCounts(farmers));
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Mock locations data since it was removed earlier
  const locations = [
    'All Locations',
    'Punjab',
    'Gujarat',
    'Andhra Pradesh',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Haryana'
  ];

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Category selection is handled directly in the select onChange

  // Filter and sort farmers
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = searchTerm === '' || 
                        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        farmer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (farmer.products && farmer.products.some((p: string) => p.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesLocation = !location || location === 'All Locations' || 
                          (farmer.location && farmer.location.toLowerCase().includes(location.toLowerCase()));
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' ||
                          (farmer.products && farmer.products.some((p: string) => 
                            p.toLowerCase().includes(selectedCategory.toString().toLowerCase())
                          ));
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Sort farmers with null checks
  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === 'experience') {
      return parseInt(b.experience || '0') - parseInt(a.experience || '0');
    } else {
      return (a.name || '').localeCompare(b.name || '');
    }
  });
  
  // Use sortedFarmers to avoid unused variable warning
  const displayFarmers = sortedFarmers;

  return (
    <PageContainer component="main">
      <HeroSection>
        <Container maxWidth="lg">
          <FarmerLogo size={isMobile ? 100 : 150} />
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 700,
            mt: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {t('farmers.title', 'Our Trusted Farmers')}
          </Typography>
          <Typography variant="h6" sx={{ 
            maxWidth: 700,
            mx: 'auto',
            mt: 2,
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>
            {t('farmers.subtitle', 'Connect directly with local farmers for fresh, organic produce straight from the farm')}
          </Typography>

        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <StyledPaper elevation={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t('farmers.searchPlaceholder', 'Search farmers, products, or locations...') as string}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                variant="outlined"
                label={t('farmers.category', 'Category')}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ '& .MuiSelect-select': { py: 1.5 } }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={handleFilterClick}
                sx={{
                  height: '56px',
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                {t('farmers.filters', 'Filters')}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleFilterClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Box sx={{ p: 2, minWidth: 250 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1">{t('farmers.filters', 'Filters')}</Typography>
                    <IconButton size="small" onClick={handleFilterClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="sort-by-label">{t('farmers.sortBy', 'Sort By')}</InputLabel>
                    <Select
                      labelId="sort-by-label"
                      value={sortBy}
                      label={t('farmers.sortBy', 'Sort By')}
                      onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as string)}
                      size="small"
                    >
                      <MenuItem value="rating">{t('farmers.highestRated', 'Highest Rated')}</MenuItem>
                      <MenuItem value="experience">{t('farmers.mostExperienced', 'Most Experienced')}</MenuItem>
                      <MenuItem value="name">{t('farmers.nameAZ', 'Name (A-Z)')}</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    size="small"
                    select
                    label={t('farmers.location', 'Location')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc} value={loc}>
                        {loc}
                      </MenuItem>
                    ))}
                  </TextField>

                  <StyledButton
                    fullWidth
                    variant="contained"
                    onClick={handleFilterClose}
                    sx={{ mt: 1 }}
                  >
                    {t('common.apply', 'Apply Filters')}
                  </StyledButton>
                </Box>
              </Menu>
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, newView) => newView && setView(newView)}
                aria-label="view mode"
                size={isSmallScreen ? 'small' : 'medium'}
              >
                <ToggleButton value="grid" aria-label="grid view">
                  <GridViewIcon fontSize="small" />
                  {!isSmallScreen && <Box component="span" ml={0.5}>{t('common.grid', 'Grid')}</Box>}
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon fontSize="small" />
                  {!isSmallScreen && <Box component="span" ml={0.5}>{t('common.list', 'List')}</Box>}
                </ToggleButton>
              </StyledToggleButtonGroup>
            </Grid>
          </Grid>
        </StyledPaper>


        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {selectedCategory && selectedCategory !== 'all' 
              ? `${filteredFarmers.length} ${filteredFarmers.length === 1 ? 'Farmer' : 'Farmers'} found in ${selectedCategory}`
              : `${filteredFarmers.length} ${filteredFarmers.length === 1 ? 'Farmer' : 'Farmers'} available`}
          </Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => newView && setView(newView)}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

      
      {/* Selected Category Chips */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedCategory !== 'all' && (
          <Chip 
            label={categories.find(c => c.id === selectedCategory)?.name}
            onDelete={() => setSelectedCategory('all')}
            color="primary"
            variant="outlined"
            sx={{ 
              '& .MuiChip-deleteIcon': {
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.dark'
                }
              }
            }}
          />
        )}
        {searchTerm && (
          <Chip 
            label={`Search: ${searchTerm}`}
            onDelete={() => setSearchTerm('')}
            color="secondary"
            variant="outlined"
            sx={{
              '& .MuiChip-deleteIcon': {
                color: 'secondary.main',
                '&:hover': {
                  color: 'secondary.dark'
                }
              }
            }}
          />
        )}
        {(selectedCategory !== 'all' || searchTerm) && (
          <Button 
            size="small" 
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            sx={{ ml: 1 }}
          >
            Clear all
          </Button>
        )}
      </Box>

      {/* Farmers Grid */}
      {filteredFarmers.length > 0 ? (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {displayFarmers.map((farmer) => (
            <Grid 
              item 
              key={farmer.id} 
              xs={12} 
              sm={view === 'grid' ? 6 : 12} 
              md={view === 'grid' ? 4 : 12}
              lg={view === 'grid' ? 4 : 12}
            >
              <FarmerCard 
                name={farmer.name}
                location={farmer.location}
                rating={farmer.rating}
                specialty={farmer.specialty}
                image={farmer.image}
                products={farmer.products || []}
                variant={view === 'list' ? 'horizontal' : 'vertical'}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No farmers found matching your criteria. Try adjusting your search or filters.
          </Typography>
        </Box>
      )}
      </Container>
    </PageContainer>
  );
};

export default FarmersPage;
