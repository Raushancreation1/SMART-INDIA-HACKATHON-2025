import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Container,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Assignment as ContractIcon,
  AssignmentTurnedIn as AssignmentIcon,
  AttachMoney as MoneyIcon,
  Store as StoreIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const DashboardCard = ({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: `${color}22`, color: color, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </StyledCard>
);

const RecentActivity = () => {
  const activities = [
    { id: 1, text: 'New contract received from Agro Corp', time: '2 hours ago', icon: <ContractIcon /> },
    { id: 2, text: 'Payment of $1,200 received', time: '1 day ago', icon: <MoneyIcon /> },
    { id: 3, text: 'Contract #1234 completed successfully', time: '3 days ago', icon: <AssignmentIcon /> },
    { id: 4, text: 'New buyer interested in your produce', time: '1 week ago', icon: <StoreIcon /> },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {activities.map((activity) => (
          <React.Fragment key={activity.id}>
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                  {activity.icon}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={activity.text}
                secondary={activity.time}
                primaryTypographyProps={{ variant: 'body1' }}
                secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
              />
            </ListItem>
            {activity.id < activities.length && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

const ContractStatus = () => {
  const contracts = [
    { id: 1, name: 'Wheat Harvest 2023', progress: 75, status: 'In Progress', date: 'Due in 15 days' },
    { id: 2, name: 'Rice Contract #456', progress: 30, status: 'In Progress', date: 'Due in 30 days' },
    { id: 3, name: 'Corn Supply Agreement', progress: 10, status: 'New', date: 'Due in 45 days' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'primary';
      case 'in progress':
        return 'secondary';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Active Contracts</Typography>
        <Button size="small" color="primary">
          View All
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box>
        {contracts.map((contract) => (
          <Box key={contract.id} mb={3}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">{contract.name}</Typography>
              <Chip
                label={contract.status}
                size="small"
                color={getStatusColor(contract.status) as any}
                variant="outlined"
              />
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={contract.progress} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {contract.progress}%
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                {contract.date}
              </Typography>
              <Button size="small" color="primary">
                Details
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const FarmerDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // Fetch contracts when component mounts
    // dispatch(fetchContractsStart());
  }, [dispatch]);

  const stats = [
    {
      title: 'Active Contracts',
      value: '5',
      icon: <ContractIcon fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Total Earnings',
      value: '$12,450',
      icon: <MoneyIcon fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: 'Buyers',
      value: '8',
      icon: <StoreIcon fontSize="large" />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Upcoming Deliveries',
      value: '3',
      icon: <CalendarIcon fontSize="large" />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || 'Farmer'}! 👋
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's what's happening with your farm today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Performance Overview</Typography>
              <Button variant="outlined" size="small" startIcon={<TrendingUpIcon />}>
                View Analytics
              </Button>
            </Box>
            <Box height={300} display="flex" alignItems="center" justifyContent="center" bgcolor="action.hover" borderRadius={1}>
              <Typography color="text.secondary">Performance Chart Placeholder</Typography>
            </Box>
          </Paper>

          <RecentActivity />
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <ContractStatus />
          
          <Paper sx={{ p: 2, mt: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Quick Actions</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => navigate('/farmer/contracts/new')}
              >
                Create New Contract
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => navigate('/farmer/inventory')}
              >
                Update Inventory
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => navigate('/farmer/profile')}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FarmerDashboard;
