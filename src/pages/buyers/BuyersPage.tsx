import React, { useState } from 'react';
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
  Card,
  CardContent,
  Tooltip,
  MenuItem,
  Paper,
  styled
} from '@mui/material';
import { 
  Search, 
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Store as StoreIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  VerifiedUser,
  Star
} from '@mui/icons-material';

// Styled components for the Buyers page
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: '2rem 0',
  position: 'relative',
  background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), 
              url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));


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

// Sample buyer data with high-quality images
const buyers = [
  {
    id: 1,
    name: 'FreshMart Supermarket',
    type: 'Retail Chain',
    location: 'Mumbai, India',
    rating: 4.7,
    description: 'Premium grocery chain with 50+ outlets across India, specializing in farm-fresh produce and organic products.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    logo: 'https://img.icons8.com/color/96/shop.png',
    categories: ['Fruits', 'Vegetables', 'Dairy', 'Grains', 'Bakery'],
    yearsActive: 12,
    contact: {
      email: 'contact@freshmart.com',
      phone: '+91 98765 43210',
      website: 'www.freshmart.com'
    },
    verified: true
  },
  {
    id: 2,
    name: 'Organic Harvest',
    type: 'Organic Store',
    location: 'Bangalore, India',
    rating: 4.9,
    description: 'Specialized in organic and natural food products, supporting local farmers and sustainable agriculture.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
    logo: 'https://img.icons8.com/color/96/organic-food.png',
    categories: ['Organic', 'Health Foods', 'Superfoods', 'Herbs', 'Spices'],
    yearsActive: 8,
    contact: {
      email: 'info@organicharvest.in',
      phone: '+91 98765 43211',
      website: 'www.organicharvest.in'
    },
    verified: true
  },
  {
    id: 3,
    name: 'Spice Bazaar',
    type: 'Wholesaler',
    location: 'Delhi, India',
    rating: 4.5,
    description: 'Premier wholesaler of premium Indian spices, herbs, and seasonings, sourcing directly from farmers across India.',
    image: 'https://images.unsplash.com/photo-1605244863949-5550d03624d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    logo: 'https://img.icons8.com/color/96/spices.png',
    categories: ['Spices', 'Herbs', 'Seasonings', 'Masalas', 'Tea'],
    yearsActive: 15,
    contact: {
      email: 'sales@spicebazaar.com',
      phone: '+91 98765 43212',
      website: 'www.spicebazaar.com'
    },
    verified: true
  },
  {
    id: 4,
    name: 'Farm to Table',
    type: 'Restaurant Chain',
    location: 'Pune, India',
    rating: 4.8,
    description: 'Award-winning restaurant group committed to serving dishes made from locally-sourced, seasonal ingredients directly from regional farms.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    logo: 'https://img.icons8.com/color/96/restaurant-table.png',
    categories: ['Produce', 'Dairy', 'Meat', 'Grains', 'Herbs', 'Honey'],
    yearsActive: 7,
    contact: {
      email: 'hello@farmtotable.in',
      phone: '+91 98765 43213',
      website: 'www.farmtotable.in'
    },
    verified: true
  },
  {
    id: 5,
    name: 'Green Basket',
    type: 'Online Grocery',
    location: 'Hyderabad, India',
    rating: 4.6,
    description: 'Leading online grocery platform delivering farm-fresh, organic, and seasonal produce directly to your doorstep within 2 hours.',
    image: 'https://images.unsplash.com/photo-1607082352423-1203cbf8a4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    logo: 'https://img.icons8.com/color/96/online-store.png',
    categories: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks'],
    yearsActive: 5,
    contact: {
      email: 'support@greenbasket.in',
      phone: '+91 98765 43214',
      website: 'www.greenbasket.in'
    },
    verified: true
  },
  {
    id: 6,
    name: 'Heritage Foods',
    type: 'Specialty Store',
    location: 'Chennai, India',
    rating: 4.7,
    description: 'Specialty store dedicated to preserving and promoting traditional and regional Indian foods, working directly with farmers to source authentic ingredients.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    logo: 'https://img.icons8.com/color/96/india.png',
    categories: ['Grains', 'Pulses', 'Spices', 'Sweets', 'Pickles', 'Oils'],
    yearsActive: 10,
    contact: {
      email: 'info@heritagefoods.in',
      phone: '+91 98765 43215',
      website: 'www.heritagefoods.in'
    },
    verified: true
  }
];

const categories = [
  { id: 'all', name: 'All', icon: <StoreIcon /> },
  { id: 'retail', name: 'Retail', icon: <StoreIcon /> },
  { id: 'restaurant', name: 'Restaurant', icon: <StoreIcon /> },
  { id: 'wholesale', name: 'Wholesale', icon: <StoreIcon /> },
  { id: 'online', name: 'Online', icon: <StoreIcon /> },
];

const locations = [
  'All Locations',
  'Mumbai',
  'Bangalore',
  'Delhi',
  'Pune',
  'Hyderabad',
  'Chennai'
];

const BuyerCard = ({ buyer, variant = 'vertical' }: { buyer: any, variant?: 'vertical' | 'horizontal' }) => {
  const isHorizontal = variant === 'horizontal';
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: isHorizontal ? { xs: 'column', sm: 'row' } : 'column',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          '& .buyer-image': {
            transform: 'scale(1.05)'
          }
        },
      }}
    >
      {/* Image Container */}
      <Box 
        sx={{
          position: 'relative',
          width: isHorizontal ? { xs: '100%', sm: 250 } : '100%',
          height: isHorizontal ? { xs: 200, sm: '100%' } : 220,
          minHeight: isHorizontal ? { xs: 200, sm: '100%' } : 220,
          overflow: 'hidden',
          bgcolor: 'rgba(0,0,0,0.05)'
        }}
      >
        {/* Main Image */}
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
        
        {/* Company Logo Overlay */}
        {buyer.logo && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
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
              src={buyer.logo}
              alt={`${buyer.name} logo`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}
        
        {/* Verified Badge */}
        {buyer.verified && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 1
            }}
          >
            <VerifiedUser color="primary" fontSize="small" />
          </Box>
        )}
        
        {/* Rating Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 4,
            backdropFilter: 'blur(4px)'
          }}
        >
          <Star sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" fontWeight="bold" color="white">
            {buyer.rating}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: 3
      }}>
        {/* Buyer Info */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Box>
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom={false}>
                {buyer.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <BusinessIcon color="action" fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                <Typography variant="body2" color="text.secondary">
                  {buyer.type}
                </Typography>
              </Box>
            </Box>
            {buyer.verified && (
              <Tooltip title="Verified Buyer">
                <VerifiedUser color="primary" fontSize="small" />
              </Tooltip>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <LocationIcon color="action" fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
            <Typography variant="body2" color="text.secondary">
              {buyer.location}
            </Typography>
          </Box>
        </Box>
        
        {/* Description */}
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {buyer.description}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Looking for:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {buyer.categories.slice(0, 3).map((category: string, index: number) => (
              <Chip 
                key={index}
                label={category}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {buyer.categories.length > 3 && (
              <Chip 
                label={`+${buyer.categories.length - 3} more`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const BuyersPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [view, setView] = useState<'grid' | 'list'>(isMobile ? 'grid' : 'grid');
  
  // Filter buyers based on search and filters
  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = searchTerm === '' || 
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      buyer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All Categories' || 
      buyer.type === categoryFilter;
      
    const matchesLocation = locationFilter === 'All Locations' || 
      buyer.location.includes(locationFilter);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <StyledHeader>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Our Trusted Buyers
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph sx={{ maxWidth: '800px', margin: '0 auto' }}>
            Connect with businesses that value quality and sustainability. Our network of verified buyers ensures fair prices and reliable partnerships for your farm produce.
          </Typography>
        </StyledHeader>

        <StyledPaper>
          {/* Search and Filter Section */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder={isMobile ? "Search..." : "Search buyers..."}
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
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
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
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
            </Grid>
          </Grid>

          {/* Category Chips */}
          <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                icon={cat.icon}
                label={cat.name}
                onClick={() => setCategoryFilter(cat.id)}
                color={categoryFilter === cat.id ? 'primary' : 'default'}
                variant={categoryFilter === cat.id ? 'filled' : 'outlined'}
                sx={{
                  '& .MuiChip-icon': {
                    color: categoryFilter === cat.id ? 'primary.contrastText' : 'inherit'
                  }
                }}
              />
            ))}
          </Box>

          {/* Active Filters */}
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categoryFilter !== 'All Categories' && (
              <Chip
                label={`Type: ${categories.find(c => c.id === categoryFilter)?.name}`}
                onDelete={() => setCategoryFilter('All Categories')}
                color="primary"
                variant="outlined"
              />
            )}
            {locationFilter !== 'All Locations' && (
              <Chip
                label={`Location: ${locationFilter}`}
                onDelete={() => setLocationFilter('All Locations')}
                color="secondary"
                variant="outlined"
              />
            )}
            {searchTerm && (
              <Chip
                label={`Search: ${searchTerm}`}
                onDelete={() => setSearchTerm('')}
                color="info"
                variant="outlined"
              />
            )}
            {(categoryFilter !== 'All Categories' || locationFilter !== 'All Locations' || searchTerm) && (
              <Button
                size="small"
                onClick={() => {
                  setCategoryFilter('All Categories');
                  setLocationFilter('All Locations');
                  setSearchTerm('');
                }}
                sx={{ ml: 1 }}
              >
                Clear all
              </Button>
            )}
          </Box>

          {filteredBuyers.length > 0 ? (
            <Grid container spacing={3}>
              {filteredBuyers.map((buyer) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={buyer.id}
                >
                  <BuyerCard buyer={buyer} variant={view === 'grid' ? 'vertical' : 'horizontal'} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" py={8}>
              <Typography variant="h6" color="textSecondary">
                No buyers found matching your criteria. Try adjusting your search or filters.
              </Typography>
            </Box>
          )}
        </StyledPaper>
      </Container>
    </PageContainer>
  );
};

export default BuyersPage;
