import React from 'react';
import { Alert, Button, Box, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '400px',
            padding: 3,
            textAlign: 'center'
          }}
        >
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              maxWidth: '600px',
              marginBottom: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              کچھ غلط ہوا
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ہمیں افسوس ہے، لیکن کچھ غیر متوقع ہوا۔ براہ کرم صفحہ ریفریش کرنے کی کوشش کریں۔
            </Typography>
          </Alert>
          
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={this.handleRetry}
            sx={{ marginTop: 2 }}
          >
            دوبارہ کوشش کریں
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ marginTop: 3, textAlign: 'left', maxWidth: '100%' }}>
              <Typography variant="h6" color="error">
                Error Details (Development Mode):
              </Typography>
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto', 
                maxHeight: '200px',
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
