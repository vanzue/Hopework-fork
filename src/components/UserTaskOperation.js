import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Paper, Button, LinearProgress, Grid,
  Card, CardContent, Box, Chip, IconButton
} from '@mui/material';

function UserTaskOperation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mockImageUrl = [
    { url: 'https://demofrontendhcjiang2.blob.core.windows.net/hopework/image%20(1).png', labels: ['rice', 'wheat', 'sorghum', 'barnyard grass'] },
    { url: 'https://demofrontendhcjiang2.blob.core.windows.net/hopework/image%20(2).png', labels: ['rice', 'wheat', 'sorghum', 'barnyard grass'] },
    { url: 'https://demofrontendhcjiang2.blob.core.windows.net/hopework/image%20(3).png', labels: ['rice', 'wheat', 'sorghum', 'barnyard grass'] },
    { url: 'https://demofrontendhcjiang2.blob.core.windows.net/hopework/image%20(4).png', labels: ['rice', 'wheat', 'sorghum', 'barnyard grass'] },
    { url: 'https://demofrontendhcjiang2.blob.core.windows.net/hopework/image.png', labels: ['rice', 'wheat', 'sorghum', 'barnyard grass'] },
  ];

  const fetchTaskDetails = useCallback(async () => {
    // Add mock task data
    const mockTask = [
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
    ].find(task => task.id === parseInt(id));
    // mock end
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/details`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error('Failed to fetch task details');
      }
      const data = await response.json();
      setTask(data);
    } catch (err) {
      setTask(mockTask);
      setError(false);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  const handleClassify = (label) => {
    // Logic to handle classification
    console.log(`Image ${currentImageIndex} classified as ${label}`);
    handleNextImage();
  };

  const handleNextImage = () => {
    if (currentImageIndex < mockImageUrl.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Task completed
      navigate('/user/my-tasks');
    }
  };

  const handleSubmitTask = () => {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Loading task details...</Typography>
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
        Task Details
      </Typography>
      {task && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {task.title}
              <Chip label={task.type} color="primary" size="small" sx={{ marginLeft: '0.5rem' }}/>
              <Chip 
                label={task.difficulty} 
                color={task.difficulty === 'easy' ? 'success' : task.difficulty === 'medium' ? 'warning' : 'error'}
                size="small"
                sx={{ marginLeft: '0.5rem' }}
              />
            </Typography>
            <Typography variant="body1" paragraph>
              {task.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Reward: ${task.reward_per_unit}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Status: {task.status}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Deadline: {new Date(task.deadline).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>Progress: {(task.completed_units / task.total_units * 100).toFixed(2)}%</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(task.completed_units / task.total_units) * 100} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      <Box sx={{ mt: 4, border: '1px solid #e0e0e0', borderRadius: '4px', padding: '16px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Operation Area
        </Typography>
        {task && task.type === 'Image Classification' ? (
          <Typography variant="body1" paragraph>
            This is an image classification task. Please click the "Categorize" button below to start the classification operation.
            <Box sx={{ position: 'relative' }}>
              <Container maxWidth="md">
                <Typography variant="h4" gutterBottom align="center">
                  {task.name}
                </Typography>
                <Paper elevation={3} sx={{ padding: { xs: '1rem', sm: '2rem' }, marginTop: { xs: '1rem', sm: '2rem' } }}>
                  <Typography variant="body1" align="left" sx={{ padding: '0' }}>
                    Image {currentImageIndex + 1}
                  </Typography>
                  <Box sx={{ width: '100%', height: { xs: '230px', sm: '400px' }, backgroundColor: '#f0f0f0', marginBottom: '2rem'}}>
                    <img
                      src={mockImageUrl[currentImageIndex].url}
                      alt={`Classification ${currentImageIndex + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <Grid container spacing={2} justifyContent="center">
                    {mockImageUrl[currentImageIndex].labels.map((label, index) => (
                      <Grid item key={index}>
                        <Chip 
                          label={label} 
                          onClick={() => handleClassify(label)} 
                          color="primary" 
                          clickable
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <Button variant="contained" color="secondary" onClick={handleNextImage}>
                      Next Image
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </Box>
          </Typography>
        ) : (
          <Typography variant="body1" paragraph>
            This is a regular task. Please select the appropriate operation button according to the task requirements.
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => console.log('Click operation')}
                  sx={{ 
                    backgroundColor: '#4caf50',
                    '&:hover': { backgroundColor: '#45a049' }
                  }}
                >
                  Click
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => console.log('Categorize operation')}
                  sx={{ 
                    backgroundColor: '#ff9800',
                    '&:hover': { backgroundColor: '#f57c00' }
                  }}
                >
                  Categorize
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => console.log('Mark operation')}
                  sx={{ 
                    backgroundColor: '#2196f3',
                    '&:hover': { backgroundColor: '#1976d2' }
                  }}
                >
                  Mark
                </Button>
              </Grid>
            </Grid>
          </Typography>
        )}
        
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmitTask}
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#45a049' },
            padding: '12px 24px',
            fontSize: '1.2rem'
          }}
        >
          Submit Task
        </Button>
      </Box>
    </Container>
  );
}

export default UserTaskOperation;

