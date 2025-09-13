import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  useTheme, 
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  Assignment as ContractIcon,
  AssignmentTurnedIn as AssignmentIcon,
  AttachMoney as MoneyIcon,
  Store as StoreIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { RootState } from '../../store/store';
import { fetchContractsStart } from '../../store/slices/contractSlice';

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
    { id: 1, text: 'New contract offer sent to John Farms', time: '2 hours ago', icon: <ContractIcon /> },
    { id: 2, text: 'Payment of $3,450 processed', time: '1 day ago', icon: <MoneyIcon /> },
    { id: 3, text: 'Contract #1234 delivery scheduled', time: '3 days ago', icon: <AssignmentIcon /> },
    { id: 4, text: 'New farmer joined your network', time: '1 week ago', icon: <StoreIcon /> },
  ];

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
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

const ContractsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const contracts = [
    {
      id: 'CT-1001',
      farmer: 'John Farms',
      product: 'Organic Wheat',
      quantity: '50 tons',
      price: '$12,500',
      status: 'Active',
      delivery: '2023-11-15',
    },
    {
      id: 'CT-1002',
      farmer: 'Green Valley',
      product: 'Basmati Rice',
      quantity: '30 tons',
      price: '$9,000',
      status: 'Pending',
      delivery: '2023-11-20',
    },
    {
      id: 'CT-1003',
      farmer: 'Sunshine Farms',
      product: 'Corn',
      quantity: '75 tons',
      price: '$15,000',
      status: 'Completed',
      delivery: '2023-10-28',
    },
    {
      id: 'CT-1004',
      farmer: 'Mountain View',
      product: 'Soybeans',
      quantity: '40 tons',
      price: '$8,000',
      status: 'Active',
      delivery: '2023-12-05',
    },
    {
      id: 'CT-1005',
      farmer: 'Riverbend Farms',
      product: 'Barley',
      quantity: '25 tons',
      price: '$6,250',
      status: 'Draft',
      delivery: '2023-12-15',
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'pending':
        return <PendingIcon color="warning" fontSize="small" />;
      case 'completed':
        return <CheckCircleIcon color="primary" fontSize="small" />;
      case 'draft':
      default:
        return <WarningIcon color="action" fontSize="small" />;
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Recent Contracts</Typography>
        <Box>
          <Tooltip title="Filter">
            <IconButton size="large">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton size="large">
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="contracts table">
          <TableHead>
            <TableRow>
              <TableCell>Contract ID</TableCell>
              <TableCell>Farmer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.farmer}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(row.status)}
                    label={row.status}
                    size="small"
                    variant="outlined"
                    color={
                      row.status === 'Active'
                        ? 'success'
                        : row.status === 'Pending'
                        ? 'warning'
                        : row.status === 'Completed'
                        ? 'primary'
                        : 'default'
                    }
                  />
                </TableCell>
                <TableCell>{row.delivery}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/buyer/contracts/${row.id}`)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contracts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const BuyerDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector((state: RootState) => state.auth);
  // Removed unused variables to clean up code

  useEffect(() => {
    // Fetch contracts when component mounts
    dispatch(fetchContractsStart());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const stats = [
    {
      title: 'Active Contracts',
      value: '8',
      icon: <ContractIcon fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Total Spent',
      value: '$45,200',
      icon: <MoneyIcon fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: 'Farmers',
      value: '12',
      icon: <StoreIcon fontSize="large" />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Upcoming Deliveries',
      value: '5',
      icon: <CalendarIcon fontSize="large" />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome back, {user?.name || 'Buyer'}! 👋
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Here's your procurement dashboard
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/buyer/contracts/new')}
          >
            New Contract
          </Button>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 3 }}
        >
          <Tab label="Overview" />
          <Tab label="Contracts" />
          <Tab label="Farmers" />
          <Tab label="Reports" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <>
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
                  <Typography variant="h6">Spending Overview</Typography>
                  <Button variant="outlined" size="small" startIcon={<TrendingUpIcon />}>
                    View Report
                  </Button>
                </Box>
                <Box height={300} display="flex" alignItems="center" justifyContent="center" bgcolor="action.hover" borderRadius={1}>
                  <Typography color="text.secondary">Spending Chart Placeholder</Typography>
                </Box>
              </Paper>
              <ContractsTable />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <RecentActivity />
            </Grid>
          </Grid>
        </>
      )}

      {tabValue === 1 && <ContractsTable />}
      
      {tabValue === 2 && (
        <Paper sx={{ p: 3, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="text.secondary">Farmers Management - Coming Soon</Typography>
        </Paper>
      )}
      
      {tabValue === 3 && (
        <Paper sx={{ p: 3, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="text.secondary">Reports - Coming Soon</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default BuyerDashboard;
