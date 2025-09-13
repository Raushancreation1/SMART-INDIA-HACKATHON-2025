import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Send as SendIcon
} from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      // const response = await api.post('/contact', formData);
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Email',
      value: 'contact@farmconnect.com',
      link: 'mailto:contact@farmconnect.com'
    },
    {
      icon: <PhoneIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <LocationIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Location',
      value: '123 Farm Road, Agriculture City, AC 12345',
      link: 'https://maps.google.com'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Contact Us
        </Typography>
        
        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          We'd love to hear from you. Get in touch with our team.
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
                Contact Information
              </Typography>
              
              <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
                {contactInfo.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box sx={{ mr: 3, mt: 0.5 }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography 
                        component="a" 
                        href={item.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'text.secondary',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 4 }} />
              
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                  Business Hours
                </Typography>
                <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', py: 0.5 } }}>
                  <Typography>Monday - Friday</Typography>
                  <Typography>9:00 AM - 6:00 PM</Typography>
                </Box>
                <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', py: 0.5 } }}>
                  <Typography>Saturday</Typography>
                  <Typography>10:00 AM - 4:00 PM</Typography>
                </Box>
                <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', py: 0.5 } }}>
                  <Typography>Sunday</Typography>
                  <Typography>Closed</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
                Send Us a Message
              </Typography>
              
              {submitStatus && (
                <Alert 
                  severity={submitStatus.success ? 'success' : 'error'} 
                  sx={{ mb: 3 }}
                >
                  {submitStatus.message}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="message"
                      name="message"
                      label="Your Message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
