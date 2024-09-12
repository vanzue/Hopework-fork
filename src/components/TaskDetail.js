import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, LinearProgress, Grid,
  Box, Paper, Chip, List, ListItem, ListItemText, Link,
  IconButton
} from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

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

  const handleReviewTask = () => {
    navigate(`/company/acceptance/${id}`);
  };

  const handleBack = () => {
    navigate('/company/tasks');
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
    <Container maxWidth="md" sx={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
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
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '1.5rem' }}>
        Task Details
      </Typography>
      <Box sx={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#1976d2' }}>
          {task.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '1.5rem', color: '#555' }}>
          {task.description}
        </Typography>
        <Grid container spacing={3} sx={{ paddingBottom: '2rem', height: '100%' }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '1rem', height: '100%' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(task.completed_units / task.total_units) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: '#1976d2',
                      }
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round((task.completed_units / task.total_units) * 100)}%`}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                <strong>Total Units:</strong> {task.total_units}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                <strong>Completed Units:</strong> {task.completed_units}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                <strong>Status:</strong>
                <Chip
                  label={task.status}
                  color={task.status === 'In Progress' ? 'success' : 'warning'}
                  size="small"
                  sx={{ marginLeft: '0.5rem' }}
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '1rem', height: '100%' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Task Info
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                <strong>Type:</strong> {task.type}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                <strong>Deadline:</strong> {task.deadline}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                <strong>Reward:</strong> {task.reward_per_unit}
              </Typography>
              <Typography variant="body2">
                <strong>Difficulty:</strong> 
                <Chip 
                  label={task.difficulty} 
                  color={task.difficulty === 'Easy' ? 'success' : task.difficulty === 'Medium' ? 'warning' : 'error'}
                  size="small"
                  sx={{ marginLeft: '0.5rem' }}
                />
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Resources
              </Typography>
              {task.resources && task.resources.length > 0 ? (
                <List dense sx={{ 
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 1,
                  '& .MuiListItem-root': {
                    borderBottom: '1px solid #e0e0e0',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  },
                }}>
                  {task.resources.map((resource, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <LinkIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Link 
                            href={resource} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            sx={{
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Resource {index + 1}
                          </Link>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  No resources available
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => handlePauseTask(task.id)}
            sx={{ 
              backgroundColor: '#ff9800',
              '&:hover': { backgroundColor: '#f57c00' }
            }}
          >
            Pause
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => handleCancelTask(task.id)}
            sx={{ 
              backgroundColor: '#f44336',
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleReviewTask}
            sx={{ 
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#45a049' }
            }}
          >
            Review
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TaskDetail;