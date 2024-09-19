import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, LinearProgress, Grid,
  Box, Paper, Chip, List, ListItem, ListItemText, Link,
  IconButton
} from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';

function CompanyTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add mock task data
    const mockTasks = [
      {
        id: 1,
        title: 'Local Advertisement Image Collection',
        type: 'Image Collection',
        difficulty: 'easy',
        status: 'In Progress',
        description: 'Users are asked to take pictures of local advertisements with their phones. The images should clearly show the text on the advertisements and include background context such as shops, buildings, or streets where the advertisements are located. This helps provide a comprehensive view of the advertisement’s environment. The goal is to gather diverse advertisements from various locations to analyze marketing trends and strategies. Ensure the images are clear and the text is legible. Avoid taking pictures of people without their consent.',
        reward_per_unit: 2,
        total_units: 1000,
        completed_units: 86,
        deadline: '2025-01-31'
      },
      {
        id: 2,
        title: 'Crop Species Classification',
        type: 'Image Classification',
        difficulty: 'medium',
        status: 'Not Started',
        description: 'This task involves identifying the species of crops in provided images. Users will be shown pictures of different crops(and weeds) and need to classify them correctly. This helps in monitoring agricultural fields and managing crop health. Users should have basic knowledge of agricultural crops to perform this task accurately. The task aims to support farmers in distinguishing between crops and weeds, thereby improving crop management practices.',
        reward_per_unit: 10,
        total_units: 500,
        completed_units: 0,
        deadline: '2024-11-15'
      },
      {
        id: 3,
        title: 'Local Handicrafts Data Labelling',
        type:'Data Labelling',
        difficulty:'easy',
        status:'In Progress',
        description:'In this task, users are required to identify and label local handicrafts. Users will be provided with images of various handicrafts and need to label them with the correct names and descriptions. This task helps in documenting and preserving local cultural heritage. Users should have some knowledge of local handicrafts to perform this task accurately. The goal is to create a comprehensive database of local handicrafts, which can be used for cultural preservation and promotion.',
        reward_per_unit: 5,
        total_units: 100,
        completed_units: 23,
        deadline: '2024-10-01'
      },
      {
        id: 4,
        title: 'Sentiment Analysis',
        type: 'Language Processing',
        difficulty: 'hard',
        status: 'In Progress',
        description: 'This task involves analyzing the sentiment of provided texts. Users will be given various text samples and need to determine whether the sentiment expressed is positive, negative, or neutral. This helps in understanding public opinion and emotional responses to different topics. Users should have good comprehension skills and the ability to interpret the tone and context of the texts accurately. The goal is to create a dataset that reflects the emotional tone of the texts, which can be used for further analysis and research.',
        reward_per_unit: 18,
        total_units: 200,
        completed_units: 50,
        deadline: '2024-09-30'
      },
      {
        id: 5,
        title: 'Audio Transcription',
        type: 'Content Moderation',
        difficulty: 'medium',
        status: 'Not Started',
        description: 'This task requires users to transcribe audio recordings into text. Users will be provided with audio files containing spoken content, and they need to accurately transcribe the speech into text. This task helps in converting spoken information into a written format for documentation and analysis. Users should have good listening skills and attention to detail to ensure accurate transcription. The goal is to create a reliable written record of the audio content.',
        reward_per_unit: 8,
        total_units: 75,
        completed_units: 0,
        deadline: '2025-08-31'
      },
      {
        id: 6,
        title: 'Dialect Recording',
        type: 'Culture Preservation',
        difficulty: 'medium',
        status: 'Completed',
        description: 'In this task, users are asked to record themselves reading a specific text in their local dialect. The text will be provided, and users need to ensure clear pronunciation and accurate representation of the dialect. This task helps in documenting and preserving linguistic diversity. Users should have a good command of their local dialect to perform this task effectively. The goal is to create a collection of recordings that showcase different dialects and contribute to linguistic research and preservation.',
        reward_per_unit: 20,
        total_units: 50,
        completed_units: 39,
        deadline: '2023-08-31'
      },
      {
        id: 7,
        title: 'Street Sign Image Collection and Annotation',
        type: 'Image Collection',
        difficulty: 'medium',
        status: 'In Progress',
        description: 'In this task, users are asked to take pictures of street signs that contain text. The images should clearly show the text on the signs and include the surrounding environment for context. After taking the pictures, users need to annotate the text in the images, specifying what the signs say. This task helps in creating a database of street signs for navigation and urban planning purposes. Ensure the images are clear and the text is legible.',
        reward_per_unit: 8,
        total_units: 150,
        completed_units: 30,
        deadline: '2023-09-15'
      },
      {
        id: 8,
        title: 'Product Image Collection',
        type: 'Image Collection',
        difficulty: 'easy',
        status: 'In Progress',
        description: 'In this task, users are asked to take pictures of product labels that contain text. The images should capture the text on the labels and include the product packaging for context. Users then need to annotate the text in the images, providing details about what the labels say. This task helps in documenting product information for consumer research and regulatory purposes. Ensure the images are clear and the text is legible. Avoid taking pictures of people without their consent.',
        reward_per_unit: 2,
        total_units: 200,
        completed_units: 97,
        deadline: '2024-09-15'
      }
    ];
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const response = await fetch('https://hopeworkapi.azurewebsites.net/api/task/list', {
          signal: controller.signal
        });
      
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error('Failed to fetch task list');
        }
        const data = await response.json();
        const task = data.filter(task => task.id === +id)[0];

        setTask(task);
      } catch (err) {
        setError(false);
        const task = mockTasks.filter(task => task.id === +id)[0];
        setTask(task);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handlePauseTask = (taskId) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    // Send a request to pause the task
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${taskId}/pause`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      signal
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error pausing task:', error);
      // alert('Failed to pause task. Please try again.');
    })
    .finally(data => {
      alert('Task has been successfully paused');
      console.log('Task paused:', data);
      // Update page data
      setTask(prevTask => ({
        ...prevTask,
        status: 'Paused'// todo: check status data
      }));
    });
  }

  const handleCancelTask = (taskId) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    // Send a request to cancel the task
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${taskId}/cancel`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      signal
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error cancelling task:', error);
      // alert('Failed to cancel task. Please try again.');
    })
    .finally(data => {
      alert('Task has been successfully cancelled');
      console.log('Task cancelled:', data);
      // Update task status
      setTask(prevTask => ({
        ...prevTask,
        status: 'Cancelled'// todo: check status data
      }));
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

export default CompanyTaskDetail;