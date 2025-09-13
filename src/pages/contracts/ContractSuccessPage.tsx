import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Description as DescriptionIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const ContractSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  // In a real app, this would come from the route state or API
  const contractNumber = 'CT-' + Math.floor(100000 + Math.random() * 900000);
  const contractDate = new Date().toLocaleDateString();

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <CheckCircleIcon 
            color="success" 
            sx={{ fontSize: 80, mb: 2 }} 
          />
          <Typography variant="h4" gutterBottom>
            Contract Created Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your contract has been successfully created and is now active.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 3, mb: 4, textAlign: 'left' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <DescriptionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Contract Details</Typography>
          </Box>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <Typography variant="body1">
                <strong>Contract Number:</strong> {contractNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Date Created:</strong> {contractDate}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> <Box component="span" color="success.main">Active</Box>
              </Typography>
            </div>
            <div>
              <Typography variant="body1">
                <strong>Next Steps:</strong>
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <EmailIcon color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Check your email" 
                    secondary="We've sent a confirmation with contract details" 
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AssignmentIcon color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Review contract" 
                    secondary="View and download your contract" 
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AssignmentIcon />}
            onClick={() => navigate('/contracts')}
          >
            View All Contracts
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
          <Typography variant="subtitle2" gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            If you have any questions about your contract or need assistance, please contact our support team at support@farmconnect.com or call us at (555) 123-4567.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContractSuccessPage;
