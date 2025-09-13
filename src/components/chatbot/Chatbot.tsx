import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Box, IconButton, TextField, Paper, Typography, Button, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const ChatbotContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
  width: '350px',
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
  backgroundColor: theme.palette.background.paper,
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

const ChatMessages = styled(Box)({
  height: '400px',
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

interface MessageBubbleProps {
  isUser: boolean;
  children: React.ReactNode;
}

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<MessageBubbleProps>(({ isUser, theme }) => ({
  maxWidth: '80%',
  padding: '10px 14px',
  borderRadius: '18px',
  lineHeight: 1.4,
  position: 'relative',
  wordWrap: 'break-word',
  ...(isUser 
    ? {
        alignSelf: 'flex-end',
        backgroundColor: '#1976d2',
        color: 'white',
        borderBottomRightRadius: '4px',
      }
    : {
        alignSelf: 'flex-start',
        backgroundColor: '#f5f5f5',
        color: 'rgba(0, 0, 0, 0.87)',
        borderBottomLeftRadius: '4px',
      }),
}));

const ChatInput = styled(Box)({
  display: 'flex',
  padding: '12px',
  borderTop: '1px solid #e0e0e0',
  backgroundColor: '#f9f9f9',
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your Fasalyan assistant. How can I help you today?', isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you find local farmers, check product availability, or answer questions about our services.",
        "For farm-fresh produce, I recommend checking our 'Farmers' section for local suppliers.",
        "Our supply chain is designed to be transparent and efficient. You can learn more in the 'How It Works' section.",
        "I can help you with account-related questions, product inquiries, or connecting with farmers.",
        "For the best experience, make sure to create an account to access all features."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = { 
        id: messages.length + 2, 
        text: randomResponse, 
        isUser: false 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) {
    return (
      <Box 
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
          startIcon={<SmartToyIcon />}
          sx={{
            borderRadius: '50px',
            padding: '12px 24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Need help?
        </Button>
      </Box>
    );
  }

  return (
    <ChatbotContainer>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        <Box display="flex" alignItems="center" gap={1}>
          <SmartToyIcon />
          <Typography variant="subtitle1" fontWeight="bold">
            Fasalyan Assistant
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </ChatHeader>
      
      <ChatMessages>
        {messages.map((message) => (
          <Box 
            key={message.id} 
            display="flex" 
            flexDirection="column"
            alignItems={message.isUser ? 'flex-end' : 'flex-start'}
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              {!message.isUser && (
                <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                  <SmartToyIcon sx={{ fontSize: '1rem' }} />
                </Avatar>
              )}
              <Typography variant="caption" color="textSecondary">
                {message.isUser ? 'You' : 'FarmBot'}
              </Typography>
            </Box>
            <MessageBubble isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <Box component="form" onSubmit={handleSendMessage} noValidate>
        <ChatInput>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <IconButton 
            type="submit" 
            color="primary" 
            disabled={!inputValue.trim()}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </ChatInput>
      </Box>
    </ChatbotContainer>
  );
};

export default Chatbot;
