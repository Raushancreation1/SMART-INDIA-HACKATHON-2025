import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper, Divider } from '@mui/material';
import FeedbackForm from '../feedback/FeedbackForm';

const TestLanguageSwitch: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        {t('language.test_title', 'Language Test')}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          {t('language.current_language', 'Current Language')}: 
          <strong>{i18n.language === 'hi' ? 'हिंदी' : 'English'}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('language.test_message', 'This is a test message to verify language switching is working.')}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t('language.switch_instructions', 'Use the language selector in the top right corner to switch between English and Hindi.')}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          {t('feedback.title', 'Share Your Feedback')}
        </Typography>
        <FeedbackForm />
      </Box>
    </Paper>
  );
};

export default TestLanguageSwitch;
