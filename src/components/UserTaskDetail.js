import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Grid, Button, Chip, 
  LinearProgress, Box, IconButton
} from '@mui/material';

function UserTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch task list');
        }
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleApply = () => {
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      alert('Application successful');
      console.log('Task apply:', data);
      navigate('/user/my-tasks');
    })
    .catch(error => {
      console.error('Error apply task:', error);
      alert('Failed to apply task. Please try again.');
    });
  };

  const handleBack = () => {
    navigate('/user/tasks');
  };

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
          <Typography variant="h6" sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            Task Steps:
          </Typography>
          {task.steps && task.steps.length > 0 ? (
            <ol>
              {task.steps.map((step, index) => (
                <li key={index}>
                  <Typography variant="body1">{step}</Typography>
                </li>
              ))}
            </ol>
          ) : (
            <Typography variant="body1">No specific steps available</Typography>
          )}
          <Box sx={{ my: 2, borderTop: '1px solid #e0e0e0' }} />
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
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Deadline: {task.deadline}</Typography>
            </Grid>
          </Grid>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleApply}
            fullWidth
            sx={{ marginTop: '1rem', textTransform: 'none', }}
          >
            Apply for This Task
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default UserTaskDetail;