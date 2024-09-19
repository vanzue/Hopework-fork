import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, LinearProgress,
  Dialog, DialogContentText, DialogTitle, Paper,
  DialogContent, DialogActions, Box, TextField, IconButton
} from '@mui/material';

function CompanyAcceptanceReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ taskResults, setTaskResults ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ feedbackDialog, setOpenFeedbackDialog ] = useState(false);
  const [ feedback, setFeedback ] = useState('');

  // Mock data - replace with actual data fetching
  const results = [
    { id: 1, description: 'Task result 1', quality: 'Good' },
    { id: 2, description: 'Task result 2', quality: 'Excellent' },
    { id: 3, description: 'Task result 3', quality: 'Fair' },
  ];

  useEffect(() => {
    // Mock task results data
    const mockTaskResults = {
      completed_jobs: 85,
      completed_tasks: 170,
      completion_percentage: "85%",
      task_details: [
        {
          id: 1,
          title: "Image Classification Task",
          completed: 50,
          total: 60
        },
        {
          id: 2,
          title: "Text Annotation Task",
          completed: 35,
          total: 40
        }
      ],
      quality_metrics: {
        accuracy: "92%",
        consistency: "88%",
        timeliness: "95%"
      }
    };
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const response = await fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/progress`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error('Failed to fetch task list');
        }
        const data = await response.json();
        console.log('===data===', data)
        setTaskResults(data.data);
      } catch (err) {
        setError(false);
        setTaskResults(mockTaskResults);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleAcceptTask = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      signal
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to accept task');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error accepting task:', error);
      // alert('Failed to accept task. Please try again.');
    })
    .finally(data => {
      alert('You have successfully accepted the task');
      navigate('/company/tasks');
    });
  };

  const handleSubmitFeedback = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedback: feedback
      }),
      signal
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error submitting feedback:', error);
      // alert('Failed to submit feedback. Please try again.');
    })
    .finally(data => {
      alert('Feedback submitted successfully');
      setFeedback('');
      setOpenFeedbackDialog(false);
    });
  };

  const handleCloseFeedbackDialog = () => {
    setFeedback('');
    setOpenFeedbackDialog(false);
  };

  const handleBack = () => {
    navigate(`/company/task/${id}`);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Loading Task Info</Typography>
          <LinearProgress sx={{ mt: 2, mb: 2 }} />
          <Typography variant="body2" color="text.secondary">Please wait...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <IconButton 
          onClick={handleBack} 
          sx={{ 
            position: 'absolute', 
            top: '0.5rem', 
            left: '1rem', 
            fontSize: '1.5rem' 
          }}
        >
          ←
        </IconButton>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: '#FFF3F3', border: '1px solid #FF6B6B' }}>
          <Typography variant="h6" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
            An Error Occurred
          </Typography>
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{
              mt: 2,
              backgroundColor: '#FF6B6B',
              '&:hover': {
                backgroundColor: '#FF4F4F',
              },
            }}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <IconButton 
        onClick={handleBack} 
        sx={{ 
          position: 'absolute', 
          top: '0.5rem', 
          left: '1rem', 
          fontSize: '1.5rem' 
        }}
      >
        ←
      </IconButton>
      <Typography variant="h4" gutterBottom>Acceptance Review</Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Completion Status</Typography>
        <Box sx={{ mb: 2 }}>
          {taskResults.completed_jobs && (
            <Typography variant="body2">
              Completion Jobs: {taskResults.completed_jobs}
            </Typography>
          )}
          {taskResults.completed_tasks && (
            <Typography variant="body2">
              Completion Tasks: {taskResults.completed_tasks}
            </Typography>
          )}
          {taskResults.completion_percentage && (
            <Typography variant="body2">
              Completion Percentage: {taskResults.completion_percentage}
            </Typography>
          )}
        </Box>
        <Typography variant="h6" gutterBottom>Task Results Structure</Typography>
        <pre>
          {JSON.stringify(taskResults, null, 2)}
        </pre>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Quality Report</Typography>
        <Box sx={{ mb: 2 }}>
          {results.map((result, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, borderLeft: `4px solid ${result.quality >= 80 ? '#4caf50' : result.quality >= 60 ? '#ff9800' : '#f44336'}` }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                {result.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  Quality:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1, minWidth: '40px' }}>
                  {result.quality === 'Good' ? (
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {result.quality}
                    </Typography>
                  ) : result.quality === 'Excellent' ? (
                    <Typography variant="body2" color="warning.main" sx={{ fontWeight: 'bold' }}>
                      {result.quality}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="error.main" sx={{ fontWeight: 'bold' }}>
                      {result.quality}
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAcceptTask} 
          sx={{ 
            mr: 2, 
            px: 4, 
            py: 1.5, 
            fontSize: '1rem', 
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          Accept
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => setOpenFeedbackDialog(true)}
          sx={{ 
            px: 4, 
            py: 1.5, 
            fontSize: '1rem',
            fontWeight: 'bold',
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(156, 39, 176, 0.04)'
            }
          }}
        >
          Provide Feedback
        </Button>
      </Box>

      <Dialog open={feedbackDialog} onClose={handleCloseFeedbackDialog}>
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your feedback on the task below. Your feedback will help us improve the quality of tasks.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please enter your feedback here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedbackDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitFeedback} color="primary" variant="contained">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CompanyAcceptanceReview;