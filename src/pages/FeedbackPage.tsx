import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { useTranslation } from 'react-i18next';

const FeedbackPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '80vh', py: 8 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('feedback.pageTitle', 'Your Feedback Matters')}
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
            {t('feedback.pageSubtitle', 'Help us improve our service by sharing your thoughts and suggestions. We read all feedback and use it to make our platform better.')}
          </Typography>
        </Box>
        
        <FeedbackForm />
        
        <Box mt={8} textAlign="center">
          <Typography variant="h6" gutterBottom>
            {t('feedback.contactTitle', 'Need Help?')}
          </Typography>
          <Typography color="text.secondary">
            {t('feedback.contactText', 'For immediate assistance, please contact our support team at')}{' '}
            <a href="mailto:support@farmconnect.example.com" style={{ color: 'inherit' }}>
              support@farmconnect.example.com
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FeedbackPage;
