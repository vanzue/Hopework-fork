import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, TextField, Select, MenuItem, FormControl, 
  InputLabel, Grid, Card, CardContent, Chip, InputAdornment, Box, Paper, LinearProgress
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

function UserTaskList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
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
    // mock end
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch('https://hopeworkapi.azurewebsites.net/api/task/browse', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error('Failed to fetch task list');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data);
        setTasks(mockTasks);
        setError(false);
        return;
      }
      setTasks(data);
    } catch (error) {
      console.error('Error fetching task list:', error);
      setTasks(mockTasks);
      setError(false);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTask = (id) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/apply`, {
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
      alert('Application successful');
      console.log('Task apply:', data);
      navigate('/user/my-tasks');
    });
  };

  const handleViewTask = (id) => {
    navigate(`/user/task/${id}`);
  };

  const filteredTasks = tasks && tasks.length > 0 && tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || task.type === filterType) &&
    (filterDifficulty === '' || task.difficulty === filterDifficulty) &&
    (filterStatus === '' || task.status === filterStatus)
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.reward_per_unit - b.reward_per_unit;
    } else if (sortOrder === 'desc') {
      return b.reward_per_unit - a.reward_per_unit;
    }
    return 0;
  });

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Loading Task List</Typography>
          <LinearProgress sx={{ mt: 2, mb: 2 }} />
          <Typography variant="body2" color="text.secondary">Please wait...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: '#FFF9F9', border: '1px solid #FF6B6B', borderRadius: '8px' }}>
          <Typography variant="h5" gutterBottom color="error" sx={{ fontWeight: 'bold', mb: 2 }}>
            Oops, something went wrong!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We're sorry, but we couldn't fetch the task list. Please try again later.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{
              mt: 2,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              borderRadius: '20px',
              padding: '8px 24px',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
            }}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Available Tasks
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Search Tasks"
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Image Collection">Image Collection</MenuItem>
              <MenuItem value="Image Classification">Image Classification</MenuItem>
              <MenuItem value="Content Moderation">Content</MenuItem>
              <MenuItem value="Data Labelling">Data</MenuItem>
              <MenuItem value="Language Processing">Language</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Filter by Difficulty</InputLabel>
            <Select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              label="Filter by Difficulty"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Sort by Reward</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Sort by Reward"
            >
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {filteredTasks && filteredTasks.length > 0 && filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 1.5 }}>
                <Typography
                  variant="h6"
                  component="div"
                  noWrap
                  onClick={() => handleViewTask(task.id)}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Type: {task.type}
                  </Typography>
                  <Chip 
                    label={task.difficulty} 
                    color={task.difficulty === 'easy' ? 'success' : task.difficulty === 'medium' ? 'warning' : 'error'}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" component="p" sx={{ mb: 0.5 }}>
                  Status: {task.status}
                </Typography>
                <Typography variant="h5" component="p" sx={{ mt: 3, color: 'success.main', fontWeight: 'bold', textAlign: 'center' }}>
                  Reward: ${task.reward_per_unit}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleApplyTask(task.id)}
                  sx={{ 
                    borderRadius: '20px', 
                    textTransform: 'none',
                    width: '100%',
                    mb: 1
                  }}
                >
                  Apply for this task
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserTaskList;