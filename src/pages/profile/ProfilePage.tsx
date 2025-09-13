import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Divider,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const ProfilePage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock user data - in a real app, this would come from your auth context or API
  const [user, setUser] = useState({
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Farm Road, Springfield, IL 62704',
    bio: 'Passionate farmer with 10+ years of experience in sustainable agriculture.',
    role: 'farmer',
    company: 'Doe Family Farms',
    notifications: true,
    emailNotifications: true,
    darkMode: false,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // In a real app, you would make an API call to update the user's profile
    console.log('Saving profile:', user);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form or fetch fresh data
    setIsEditing(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Profile</Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Box>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Settings" {...a11yProps(1)} />
            <Tab label="Security" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        <TabPanel value={value} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  alt={user.name}
                  src="/path-to-avatar.jpg"
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                {isEditing && (
                  <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                    Change Photo
                  </Button>
                )}
                <Typography variant="h6" sx={{ mt: 2 }}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role === 'farmer' ? 'Farmer' : 'Buyer'} at {user.company}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
          <Box sx={{ mb: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={user.notifications}
                  onChange={handleInputChange}
                  name="notifications"
                  color="primary"
                />
              }
              label="Enable Notifications"
            />
            <br />
            <FormControlLabel
              control={
                <Switch
                  checked={user.emailNotifications}
                  onChange={handleInputChange}
                  name="emailNotifications"
                  color="primary"
                  disabled={!user.notifications}
                />
              }
              label="Email Notifications"
            />
          </Box>

          <Typography variant="h6" gutterBottom>Display Preferences</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={user.darkMode}
                onChange={handleInputChange}
                name="darkMode"
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={value} index={2}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                name="currentPassword"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Update Password
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Add an extra layer of security to your account by enabling two-factor authentication.
            </Typography>
            <Button variant="outlined" color="primary">
              Enable Two-Factor Authentication
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>Danger Zone</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Once you delete your account, there is no going back. Please be certain.
            </Typography>
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
