import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Button, Chip, Paper, IconButton,
  LinearProgress, Box, Card, CardContent, CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserMyTasks() {
  const navigate = useNavigate();

  const [myTask, setMyTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchTaskDetails = async () => {
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
        }
      ];
      // mock end
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const response = await fetch('https://hopeworkapi.azurewebsites.net/api/task/mytasks', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch task list');
        // }
        const data = await response.json();
        console.log(data)
        setMyTask(data);
      } catch (err) {
        setError(false); // Using setError
        setMyTask(mockTasks);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, []);

  const handleSubmitTask = (id) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error apply task:', error);
      // alert('Failed to apply task. Please try again.');
    })
    .finally(data => {
      alert('Submit successful');
      console.log('Task Submit:', data);
      navigate(`/user/task-feedback/${id}`);
    });
  };

  const handleViewTaskOperation = (taskId) => {
    // Navigate to task details page based on task ID
    navigate(`/user/task-operation/${taskId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Loading my task.</Typography>
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
    <Container maxWidth="md" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
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
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        My Tasks
      </Typography>
      <Grid container spacing={3}>
        {myTask.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Typography
                    variant="h6"
                    component="span"
                    noWrap
                    onClick={() => handleViewTaskOperation(task.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Chip label={task.type} color="primary" size="small" sx={{ marginLeft: '0.5rem' }}/>
                  <Chip 
                    label={task.difficulty} 
                    color={task.difficulty === 'easy' ? 'success' : task.difficulty === 'medium' ? 'warning' : 'error'}
                    size="small"
                    sx={{ marginLeft: '0.5rem' }}
                  />
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body2">Reward: ${task.reward_per_unit}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Status: {task.status}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>Progress: {(task.completed_units / task.total_units) * 100}%</Typography>
                  <LinearProgress 
                      variant="determinate" 
                      value={(task.completed_units / task.total_units) * 100} 
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  variant="contained"
                  onClick={() => handleSubmitTask(task.id)}
                >
                  Submit Task
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserMyTasks;