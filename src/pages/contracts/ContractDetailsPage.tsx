import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Divider, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Chip, 
  Avatar,
  Card,
  CardContent,
  Tabs,
  Tab,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  LocalShipping as ShippingIcon,
  LocalShipping as LocalShippingIcon,
  LocationOn as LocationOnIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`contract-tabpanel-${index}`}
      aria-labelledby={`contract-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `contract-tab-${index}`,
    'aria-controls': `contract-tabpanel-${index}`,
  };
}

const ContractDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Mock data - in a real app, this would come from an API
  const contract = {
    id: id || 'CT-123456',
    title: 'Wheat Supply Contract',
    status: 'active',
    farmer: 'John Doe Farms',
    buyer: 'Agro Corp',
    cropType: 'Wheat',
    variety: 'Hard Red Spring',
    quantity: 1000,
    unit: 'kg',
    pricePerUnit: 0.45,
    totalValue: 4500,
    startDate: '2023-10-01',
    endDate: '2024-03-31',
    deliveryDate: '2024-03-15',
    deliveryMethod: 'Farmer Delivery',
    deliveryAddress: '1234 Farm Rd, Springfield, IL 62704',
    paymentTerms: '50% Advance, 50% on Delivery',
    qualitySpecifications: 'Moisture content max 12%, Purity 99%',
    notes: 'Special packaging required for international shipping',
  };

  const getStatusChip = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Chip icon={<CheckCircleIcon />} label="Active" color="success" />;
      case 'pending':
        return <Chip icon={<InfoIcon />} label="Pending" color="info" />;
      case 'warning':
        return <Chip icon={<WarningIcon />} label="Warning" color="warning" />;
      case 'error':
        return <Chip icon={<ErrorIcon />} label="Error" color="error" />;
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back to Contracts
        </Button>
        <Box>
          <Tooltip title="Edit">
            <IconButton sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate">
            <IconButton sx={{ mr: 1 }}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton sx={{ mr: 1 }}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email">
            <IconButton>
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {contract.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                Contract #{contract.id}
              </Typography>
              {getStatusChip(contract.status)}
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" color="primary">
              ${contract.totalValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Contract Value
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="contract details tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Timeline" {...a11yProps(1)} />
              <Tab label="Documents" {...a11yProps(2)} />
              <Tab label="Payments" {...a11yProps(3)} />
              <Tab label="Activity" {...a11yProps(4)} />
            </Tabs>
          </Box>
          
          <TabPanel value={value} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Contract Details
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarIcon color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Contract Period" 
                          secondary={`${new Date(contract.startDate).toLocaleDateString()} - ${new Date(contract.endDate).toLocaleDateString()}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <ShippingIcon color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Delivery Date" 
                          secondary={new Date(contract.deliveryDate).toLocaleDateString()} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <MoneyIcon color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Payment Terms" 
                          secondary={contract.paymentTerms} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Product Details
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Crop Type" 
                          secondary={contract.cropType} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Variety" 
                          secondary={contract.variety || 'N/A'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Quantity" 
                          secondary={`${contract.quantity} ${contract.unit}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Price Per Unit" 
                          secondary={`$${contract.pricePerUnit}/${contract.unit}`} 
                        />
                      </ListItem>
                      {contract.qualitySpecifications && (
                        <ListItem>
                          <ListItemText 
                            primary="Quality Specifications" 
                            secondary={contract.qualitySpecifications} 
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Parties
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>F</Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary="Farmer" 
                          secondary={contract.farmer} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary="Buyer" 
                          secondary={contract.buyer} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Delivery Information
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <LocalShippingIcon color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Delivery Method" 
                          secondary={contract.deliveryMethod} 
                        />
                      </ListItem>
                      {contract.deliveryAddress && (
                        <ListItem>
                          <ListItemIcon>
                            <LocationOnIcon color="action" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Delivery Address" 
                            secondary={contract.deliveryAddress} 
                            secondaryTypographyProps={{ style: { whiteSpace: 'pre-line' } }}
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>

                {contract.notes && (
                  <Card variant="outlined" sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Notes
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contract.notes}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={value} index={1}>
            <Typography>Timeline content goes here</Typography>
          </TabPanel>
          
          <TabPanel value={value} index={2}>
            <Typography>Documents content goes here</Typography>
          </TabPanel>
          
          <TabPanel value={value} index={3}>
            <Typography>Payments content goes here</Typography>
          </TabPanel>
          
          <TabPanel value={value} index={4}>
            <Typography>Activity log content goes here</Typography>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContractDetailsPage;
