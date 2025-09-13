import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { Send as SendIcon, Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';

interface FeedbackFormData {
  name: string;
  email: string;
  rating: number | null;
  message: string;
}

const FeedbackForm: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FeedbackFormData>({
    defaultValues: {
      name: '',
      email: '',
      rating: null,
      message: ''
    },
    criteriaMode: 'all',
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Feedback submitted:', data);
      setOpenSnackbar(true);
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box 
          bgcolor={theme.palette.primary.main} 
          color="white" 
          p={3}
          textAlign="center"
        >
          <Typography variant="h5" component="h2">
            {t('feedback.title', 'Share Your Feedback')}
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
            {t('feedback.subtitle', 'We value your opinion and would love to hear from you!')}
          </Typography>
        </Box>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ 
                    required: t('feedback.errors.required', 'This field is required') as string,
                    minLength: {
                      value: 2,
                      message: t('feedback.errors.minLength', 'Name must be at least 2 characters') as string
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('feedback.form.name', 'Your Name')}
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: t('feedback.errors.required', 'This field is required') as string,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('feedback.errors.invalidEmail', 'Invalid email address') as string
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="email"
                      label={t('feedback.form.email', 'Email Address')}
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <Typography component="legend" gutterBottom>
                    {t('feedback.form.rating', 'How would you rate your experience?')}
                  </Typography>
                  <Controller
                    name="rating"
                    control={control}
                    rules={{ 
                      validate: (value: number | null) => 
                        value !== null || (t('feedback.errors.ratingRequired', 'Please provide a rating') as string)
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Box>
                        <Rating
                          name="rating"
                          value={value}
                          onChange={(_, newValue) => {
                            onChange(newValue);
                          }}
                          icon={<StarIcon fontSize="inherit" color="primary" />}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          size="large"
                          disabled={isSubmitting}
                        />
                        {errors.rating && (
                          <Typography color="error" variant="caption" display="block" mt={1}>
                            {errors.rating.message}
                          </Typography>
                        )}
                      </Box>
                    )}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="message"
                  control={control}
                  rules={{ 
                    required: t('feedback.errors.required', 'This field is required') as string,
                    minLength: {
                      value: 10,
                      message: t('feedback.errors.messageMinLength', 'Message must be at least 10 characters') as string
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      label={t('feedback.form.message', 'Your Feedback')}
                      variant="outlined"
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} container justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<SendIcon />}
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? t('feedback.form.submitting', 'Submitting...') 
                    : t('feedback.form.submit', 'Submit Feedback')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Paper>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('feedback.success', 'Thank you for your feedback! We appreciate your time.')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackForm;
