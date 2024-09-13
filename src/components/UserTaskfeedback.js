import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, CircularProgress, Button, Alert, Paper, IconButton
} from '@mui/material';

function UserTaskFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaskFeedback();
  }, [id]);

  const fetchTaskFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/feedback`);
      if (!response.ok) {
        throw new Error('Failed to fetch task details');
      }
      const feedback = await response.json();
      setFeedback(feedback);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleViewReward= () => {
    // Logic to view reward
    console.log('View reward:');
    navigate('/user/reward-settlement');    
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <IconButton 
        onClick={handleGoBack} 
        sx={{ 
          position: 'absolute', 
          top: '1rem', 
          left: '1rem', 
          fontSize: '1.5rem' 
        }}
      >
        ←
      </IconButton>
      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Task Feedback
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Review Result: {feedback.result}
          </Typography>
          
          <Typography variant="body1" paragraph>
            Review Feedback: {feedback.comment}
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Reward Distribution:
          </Typography>
          <Typography variant="body1">
            Total Reward: ${feedback.totalReward}
          </Typography>
          <Typography variant="body1">
            Actual Earned: ${feedback.actualReward}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewReward}
            sx={{ mt: 2 }}
          >
            View Detailed Reward Information
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default UserTaskFeedback;

