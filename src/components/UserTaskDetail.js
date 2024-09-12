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
        const response = await fetch(`/api/task/${id}`);
        if (!response.ok) {
          throw new Error('无法获取任务详情');
        }
        const data = await response.json();
        setTask(data);
      } catch (err) {
        // Mock data - replace with actual data fetching
        const mockTask = [
          { id: 1, name: 'Image Classification', type: 'Image', difficulty: 'Easy', reward: 10, deadline: '2023-12-31', totalItems: 100, completedItems: 10, description: 'Classify images by identifying the main objects or scenes within them.' },
          { id: 2, name: 'Text Translation', type: 'Text', difficulty: 'Medium', reward: 20, deadline: '2023-12-31', totalItems: 100, completedItems: 15, description: 'Translate given text from one language to another while preserving the original meaning.' },
          { id: 3, name: 'Data Entry', type: 'Data', difficulty: 'Easy', reward: 15, deadline: '2023-12-31', totalItems: 30, completedItems: 30, description: 'Accurately input provided information into specified databases or spreadsheets.' },
          { id: 4, name: 'Audio Transcription', type: 'Audio', difficulty: 'Hard', reward: 30, deadline: '2023-12-31', totalItems: 100, completedItems: 41, description: 'Transcribe audio files into text, including speaker identification and timestamps.' },
          { id: 5, name: 'Sentiment Analysis', type: 'Text', difficulty: 'Medium', reward: 25, deadline: '2023-12-31', totalItems: 100, completedItems: 20, description: 'Analyze text content to determine its sentiment (positive, negative, or neutral).' },
          { id: 6, name: 'Video Annotation', type: 'Video', difficulty: 'Hard', reward: 35, deadline: '2023-12-31', totalItems: 10, completedItems: 5, description: 'Add annotations to videos, including object tagging, action descriptions, and scene classification.' },
          { id: 7, name: 'Speech Recognition', type: 'Audio', difficulty: 'Medium', reward: 28, deadline: '2023-12-31', totalItems: 40, completedItems: 20, description: 'Convert speech to text, recognizing different accents and dialects.' },
          { id: 8, name: 'Image Segmentation', type: 'Image', difficulty: 'Hard', reward: 40, deadline: '2023-12-31', totalItems: 100, completedItems: 0, description: 'Segment images into multiple semantic regions, precisely labeling each pixel.' },
        ].filter(task => task.id === +id)[0];

        console.log('---',mockTask)
        setTask(mockTask);
        // mock end
        // setError(err.message);
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

  const handleConfirmApply = () => {
    // Logic to apply for the task
    setOpenDialog(false);
    navigate('/user/my-tasks');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBack = () => {
    navigate('/user/tasks');
  };

  const handlePauseTask = (taskId) => {
    // Send a request to pause the task
    fetch(`/api/task/${taskId}/pause`, {
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
        status: 'Paused'//状态？？？
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
    fetch(`/api/task/${taskId}/cancel`, {
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
        status: 'Cancelled'//状态？？？
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
            {task.name}
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
            <Grid item xs={6}>
              <Typography variant="subtitle1">Task: {task.completedItems}/{task.totalItems}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Status: {
                  task.completedItems === 0 ? 'Not Started' :
                  task.completedItems === task.totalItems ? 'Completed' : 'In Progress'
                }
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Reward: ${task.reward}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Deadline: {task.deadline}</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            Progress: {Math.round((task.completedItems / task.totalItems) * 100)}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(task.completedItems / task.totalItems) * 100} 
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
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmApply} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserTaskDetail;