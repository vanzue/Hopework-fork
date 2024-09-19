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
          setTask(mockTask);
          throw new Error('Failed to fetch task list');
        }
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setTask(mockTask);
        setError(false);
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
    .catch(error => {
      console.error('Error apply task:', error);
      // alert('Failed to apply task. Please try again.');
    })
    .finally(data => {
      alert('Application successful');
      console.log('Task apply:', data);
      navigate('/user/my-tasks');
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