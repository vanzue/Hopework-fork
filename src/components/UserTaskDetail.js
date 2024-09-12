import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Grid, Button, Chip, 
  LinearProgress, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Box, IconButton
} from '@mui/material';

function UserTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hopeworkapi.azurewebsites.net/api/task/list');
        if (!response.ok) {
          throw new Error('Failed to fetch task list');
        }
        const data = await response.json();
        const task = data.filter(task => task.id === +id)[0];

        setTask(task);
      } catch (err) {
        // Mock data - replace with actual data fetching
        // const mockTask = [
        //   { id: 1, title: 'Image Classification', type: 'Image', status: "pending", difficulty: 'Easy', reward_per_unit: 10, deadline: '2023-12-31', total_units: 100, completed_units: 10, description: 'Classify images by identifying the main objects or scenes within them.' },
        //   { id: 2, title: 'Text Translation', type: 'Text', status: "Available", difficulty: 'Medium', reward_per_unit: 20, deadline: '2023-12-31', total_units: 100, completed_units: 15, description: 'Translate given text from one language to another while preserving the original meaning.' },
        //   { id: 3, title: 'Data Entry', type: 'Data', status: "pending", difficulty: 'Easy', reward_per_unit: 15, deadline: '2023-12-31', total_units: 30, completed_units: 30, description: 'Accurately input provided information into specified databases or spreadsheets.' },
        //   { id: 4, title: 'Audio Transcription', type: 'Audio', status: "pending", difficulty: 'Hard', reward_per_unit: 30, deadline: '2023-12-31', total_units: 100, completed_units: 41, description: 'Transcribe audio files into text, including speaker identification and timestamps.' },
        //   { id: 5, title: 'Sentiment Analysis', type: 'Text', status: "Available", difficulty: 'Medium', reward_per_unit: 25, deadline: '2023-12-31', total_units: 100, completed_units: 20, description: 'Analyze text content to determine its sentiment (positive, negative, or neutral).' },
        //   { id: 6, title: 'Video Annotation', type: 'Video', status: "pending", difficulty: 'Hard', reward_per_unit: 35, deadline: '2023-12-31', total_units: 10, completed_units: 5, description: 'Add annotations to videos, including object tagging, action descriptions, and scene classification.' },
        //   { id: 7, title: 'Speech Recognition', type: 'Audio', status: "Available", difficulty: 'Medium', reward_per_unit: 28, deadline: '2023-12-31', total_units: 40, completed_units: 20, description: 'Convert speech to text, recognizing different accents and dialects.' },
        //   { id: 8, title: 'Image Segmentation', type: 'Image', status: "pending", difficulty: 'Hard', reward_per_unit: 40, deadline: '2023-12-31', total_units: 100, completed_units: 0, description: 'Segment images into multiple semantic regions, precisely labeling each pixel.' },
        // ].filter(task => task.id === +id)[0];

        // setTask(mockTask);
        // mock end
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Loading task details</Typography>
          <LinearProgress sx={{ mt: 2, mb: 2 }} />
          <Typography variant="body2" color="text.secondary">Please wait...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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

  if (!task) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: '#F5F5F5', border: '1px solid #E0E0E0' }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#757575', fontWeight: 'bold' }}>
            Task Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#9E9E9E' }}>
            Sorry, we couldn't find the task you requested.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/user/tasks')}
            sx={{
              mt: 2,
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            Back to Task List
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleApply = () => {
    setOpenDialog(true);
  };

  const handleAcceptTask = () => {
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/review`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to accept task');
      }
      return response.json();
    })
    .then(data => {
      alert('You have successfully accepted the task');
      setOpenDialog(false);
      navigate('/user/tasks');
    })
    .catch(error => {
      console.error('Error accepting task:', error);
      alert('Failed to accept task. Please try again.');
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBack = () => {
    navigate('/user/tasks');
  };

  const handlePauseTask = (taskId) => {
    // Send a request to pause the task
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${taskId}/pause`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task paused:', data);
      // Update page data
      setTask(prevTask => ({
        ...prevTask,
        status: 'Paused'// todo: check status data
      }));
      alert('Task has been successfully paused');
    })
    .catch(error => {
      console.error('Error pausing task:', error);
      alert('Failed to pause task. Please try again.');
    });
  }

  const handleCancelTask = (taskId) => {
    // Send a request to cancel the task
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${taskId}/cancel`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task cancelled:', data);
      // Update task status
      setTask(prevTask => ({
        ...prevTask,
        status: 'Cancelled'// todo: check status data
      }));
      alert('Task has been successfully cancelled');
    })
    .catch(error => {
      console.error('Error cancelling task:', error);
      alert('Failed to cancel task. Please try again.');
    });
  }

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <IconButton 
        onClick={handleBack} 
        sx={{ 
          position: 'absolute', 
          top: '1rem', 
          left: '1rem', 
          fontSize: '1.5rem' 
        }}
      >
        ←
      </IconButton>
      <Container maxWidth="sm" sx={{ 
        paddingTop: '4rem', 
        paddingBottom: '2rem',
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '500px'
        },
        margin: 'auto'
      }}>
        <Paper elevation={3} sx={{
          padding: '2rem',
          width:  {
            xs: 'auto',
            sm: '500px'
          },
          maxWidth: '500px',
          margin: 'auto'
        }}>
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <Chip 
            label={task.type} 
            color="primary" 
            sx={{ marginBottom: '1rem' }}
          />
          <Chip 
            label={task.difficulty} 
            color={task.difficulty === 'Easy' ? 'success' : task.difficulty === 'Medium' ? 'warning' : 'error'}
            sx={{ marginLeft: '0.5rem', marginBottom: '1rem' }}
          />
          <Typography variant="body1" paragraph>
            {task.description}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Reward: ${task.reward_per_unit}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Task: {task.completed_units}/{task.total_units}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Status: {task.status}
                {/* {
                  task.completed_units === 0 ? 'Not Started' :
                  task.completed_units === task.total_units ? 'Completed' : 'In Progress'
                } */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Deadline: {task.deadline}</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            Progress: {Math.round((task.completed_units / task.total_units) * 100)}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(task.completed_units / task.total_units) * 100} 
            sx={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Button 
              variant="contained" 
              color="warning" 
              onClick={() => handlePauseTask(task.id)}
              sx={{ 
                flex: 1, 
                marginRight: '0.5rem',
                backgroundColor: '#FFA726',
                '&:hover': {
                  backgroundColor: '#FB8C00',
                },
                borderRadius: '20px',
                padding: '8px 10px',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Pause Task
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => handleCancelTask(task.id)}
              sx={{ 
                flex: 1, 
                marginLeft: '0.5rem',
                backgroundColor: '#EF5350',
                '&:hover': {
                  backgroundColor: '#E53935',
                },
                borderRadius: '20px',
                padding: '10px 15px',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Cancel Task
            </Button>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleApply}
            fullWidth
          >
            Apply for This Task
          </Button>
        </Paper>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to apply for this task? Once applied, you'll be responsible for completing it before the deadline.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Completion Status
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(task.completed_units / task.total_units) * 100} 
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="body2" color="textSecondary">
            Completed: {task.completed_units} / {task.total_units} units
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Quality Report
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Accuracy: {task.accuracy ? `${task.accuracy}%` : 'No data available'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Average Completion Time: {task.average_completion_time ? `${task.average_completion_time} minutes` : 'No data available'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Customer Satisfaction: {task.customer_satisfaction ? `${task.customer_satisfaction}/5` : 'No data available'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAcceptTask} color="success" variant="contained">
            Accept Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserTaskDetail;