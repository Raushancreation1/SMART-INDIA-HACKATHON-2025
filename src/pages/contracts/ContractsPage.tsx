import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Button, 
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Tabs,
  Tab,
  Tooltip,
  CircularProgress,
  Menu,
  ListItemIcon,
  MenuItem,
  ListItemText,
  Divider,
  Container
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { fetchContractsStart } from '../../store/slices/contractSlice';

function a11yProps(index: number) {
  return {
    id: `contract-tab-${index}`,
    'aria-controls': `contract-tabpanel-${index}`,
  };
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const ContractsPage: React.FC<{ userType: 'farmer' | 'buyer' }> = ({ userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  
  const { contracts, loading } = useSelector((state: any) => state.contracts);
  const isLoading = loading; // Alias for consistency

  useEffect(() => {
    dispatch(fetchContractsStart());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, contractId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedContract(contractId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContract(null);
  };

  const handleViewDetails = () => {
    if (selectedContract) {
      navigate(`/${userType}/contracts/${selectedContract}`);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedContract) {
      navigate(`/${userType}/contracts/${selectedContract}/edit`);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete contract', selectedContract);
    handleMenuClose();
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'pending':
        return <PendingIcon color="warning" fontSize="small" />;
      case 'completed':
        return <CheckCircleIcon color="primary" fontSize="small" />;
      case 'cancelled':
        return <WarningIcon color="error" fontSize="small" />;
      case 'draft':
      default:
        return <WarningIcon color="action" fontSize="small" />;
    }
  };

  const filteredContracts = (contracts || []).filter((contract: any) => {
    const matchesSearch = 
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.farmerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const paginatedContracts = filteredContracts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1">
            {userType === 'farmer' ? 'My Contracts' : 'Contract Management'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate(`/${userType}/contracts/new`)}
          >
            New Contract
          </Button>
        </Box>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Contracts" {...a11yProps(0)} />
            <Tab label="Active" {...a11yProps(1)} />
            <Tab label="Pending" {...a11yProps(2)} />
            <Tab label="Completed" {...a11yProps(3)} />
            <Tab label="Drafts" {...a11yProps(4)} />
          </Tabs>
          
          <Divider />
          
          <Box p={2} display="flex" alignItems="center" flexWrap="wrap" gap={2}>
            <TextField
              size="small"
              placeholder="Search contracts..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250, flexGrow: 1 }}
            />
            
            <TextField
              select
              size="small"
              variant="outlined"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              sx={{ minWidth: 200 }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <Tooltip title="Refresh">
              <IconButton onClick={() => dispatch(fetchContractsStart())}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Export">
              <IconButton>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {isLoading ? (
            <Box p={4} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contract ID</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>{userType === 'farmer' ? 'Buyer' : 'Farmer'}</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Delivery Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedContracts.length > 0 ? (
paginatedContracts.map((contract: any) => (
                        <TableRow hover key={contract.id}>
                          <TableCell>{contract.id}</TableCell>
                          <TableCell>{contract.cropType}</TableCell>
                          <TableCell>
                            {userType === 'farmer' ? contract.buyerName : contract.farmerName}
                          </TableCell>
                          <TableCell align="right">
                            {contract.quantity} {contract.unit}
                          </TableCell>
                          <TableCell align="right">
                            ${contract.totalPrice?.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(contract.status)}
                              label={contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                              size="small"
                              variant="outlined"
                              color={
                                contract.status === 'active'
                                  ? 'success'
                                  : contract.status === 'pending'
                                  ? 'warning'
                                  : contract.status === 'completed'
                                  ? 'primary'
                                  : contract.status === 'cancelled'
                                  ? 'error'
                                  : 'default'
                              }
                            />
                          </TableCell>
                          <TableCell>{contract.deliveryDate}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, contract.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                          <Box display="flex" flexDirection="column" alignItems="center">
                            <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                            <Typography variant="subtitle1" color="text.secondary">
                              No contracts found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Try adjusting your search or filter criteria
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {filteredContracts.length > 0 && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={filteredContracts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </>
          )}
        </Paper>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default ContractsPage;
