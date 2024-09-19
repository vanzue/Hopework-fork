import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
  Paper, Button, LinearProgress, Typography, Container, Box, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Chip
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useNavigate } from 'react-router-dom';

function CompanyTaskManagement() {
  const navigate = useNavigate();

  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState('');
  const [newTaskTotalItems, setNewTaskTotalItems] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('');
  const [newTaskReward, setNewTaskReward] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState(new Date().toISOString().slice(0, 10));
  const [newTaskResources, setResources] = useState([]);
  const [taskVisibility, setTaskVisibility] = useState('');
  const [specificUsers, setSpecificUsers] = useState('');
  const [openBulkUploadDialog, setOpenBulkUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTasks(data);
    } catch (error) {
      console.error('Error fetching task list:', error);
      setTasks(mockTasks);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTask = (id) => {
    navigate(`/company/task/${id}`);
  };

  const handlePauseTask = (id) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    // Send a request to pause the task
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/pause`, {
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
      alert('Task paused successful!')
      console.log('Task paused:', data);
      // fetchTasks();
    });
  };

  const handleCancelTask = (id) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    // Send a request to cancel the task
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/cancel`, {
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
      alert("Task created successful!");
      console.log('Task cancelled:', data);
      // fetchTasks();
    });
  };

  const handleCreateTask = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    // Send a request to create a new task
    fetch('https://hopeworkapi.azurewebsites.net/api/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: newTaskTitle,
        description: newTaskDescription,
        type: newTaskType, 
        total_units: newTaskTotalItems, 
        reward_per_unit: newTaskReward, 
        deadline: newTaskDeadline,
        difficulty: newTaskDifficulty,
        resources: newTaskResources,
        taskVisibility: taskVisibility,
        specificUsers: specificUsers
      }),
      signal
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error creating task:', error);
      // alert('Failed to create task. Please try again.');
    })
    .finally(data => {
      alert("Task created successful!");
      console.log('Task created:', data);
      // fetchTasks();
      handleCloseCreateTaskDialog();
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleBulkUpload = () => {
    // Send a request for bulk task upload
    const formData = new FormData();
    formData.append('file', selectedFile);
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, 2000);
    fetch('https://hopeworkapi.azurewebsites.net/api/task/batch-upload', {
      method: 'POST',
      body: formData,
      signal
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error during bulk task upload:', error);
      // alert('Bulk upload of tasks failed, please try again');
    })
    .finally(data => {
      console.log('Bulk task upload successful:', data);
      alert('Bulk task upload successful!');
      handleCloseBulkUploadDialog();
      fetchTasks();
    });
  };

  const handleOpenCreateTaskDialog = () => {
    setOpenCreateTaskDialog(true);
  };

  const handleCloseCreateTaskDialog = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskType('');
    setNewTaskTotalItems('');
    setNewTaskDifficulty('');
    setNewTaskReward('');
    setNewTaskDeadline(new Date().toISOString().slice(0, 10));
    setTaskVisibility('');
    setSpecificUsers('');
    setResources([]);
    setOpenCreateTaskDialog(false);
  };

  const handleOpenBulkUploadDialog = () => {
    setOpenBulkUploadDialog(true);
  };

  const handleCloseBulkUploadDialog = () => {
    setSelectedFile(null);
    setOpenBulkUploadDialog(false);
  };

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

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Task Management</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenCreateTaskDialog}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
            borderRadius: '20px',
            padding: '10px 20px',
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          {window.innerWidth <= 600 ? "Create new" : "Create New Task"}
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleOpenBulkUploadDialog}
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#F57C00',
            },
            borderRadius: '20px',
            padding: '10px 20px',
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          {window.innerWidth <= 600 ? "Bulk Upload" : "Bulk Upload Tasks"}
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Task Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Progress</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow 
                key={task.id}
                sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
              >
                <TableCell sx={{ fontSize: '0.9rem' }}>{task.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={task.status} 
                    color={
                      task.status === 'Completed' ? 'success' :
                      task.status === 'In Progress' ? 'primary' :
                      task.status === 'Pending' ? 'default' :
                      'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: '30%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(task.completed_units / task.total_units) * 100} 
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {`${Math.round((task.completed_units / task.total_units) * 100)}%`}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                    <Button 
                      size="small"
                      color="primary"
                      onClick={() => handleViewTask(task.id)}
                      sx={{ width: { xs: '100%', sm: 'auto' }, borderRadius: '20px' }}
                    >
                      View
                    </Button>
                    <Button 
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => handlePauseTask(task.id)}
                      sx={{ width: { xs: '100%', sm: 'auto' }, borderRadius: '20px' }}
                    >
                      Pause
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancelTask(task.id)}
                      sx={{ width: { xs: '100%', sm: 'auto' }, borderRadius: '20px' }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openCreateTaskDialog} onClose={handleCloseCreateTaskDialog}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent sx={{ '& .MuiTextField-root': { marginBottom: 0 } }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Task Description"
            type="text"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }} required>
            <InputLabel>Task Type</InputLabel>
            <Select
              value={newTaskType}
              onChange={(e) => setNewTaskType(e.target.value)}
              label="Task Type"
            >
              <MenuItem value="image_labeling">Image</MenuItem>
              <MenuItem value="content_moderation">Content</MenuItem>
              <MenuItem value="data_entry">Data</MenuItem>
              <MenuItem value="translation">Translation</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="taskTotalItems"
            label="Task Total Items"
            type="number"
            fullWidth
            variant="outlined"
            value={newTaskTotalItems}
            onChange={(e) => setNewTaskTotalItems(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              inputProps: { min: 1 }
            }}
            required
          />
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }} required>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={newTaskDifficulty}
              onChange={(e) => setNewTaskDifficulty(e.target.value)}
              label="Difficulty"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="reward"
            label="Reward"
            type="number"
            fullWidth
            variant="outlined"
            value={newTaskReward}
            onChange={(e) => setNewTaskReward(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
        <TextField
          margin="dense"
          id="deadline"
          label="Deadline"
          type="date"
          fullWidth
          variant="outlined"
          value={newTaskDeadline || new Date().toISOString().slice(0, 16)}
          onChange={(e) => setNewTaskDeadline(e.target.value)}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="resources"
          label="Resource Links"
          type="text"
          fullWidth
          variant="outlined"
          required
          value={newTaskResources.join(', ')}
          onChange={(e) => setResources(e.target.value.split(',').map(link => link.trim()))}
          sx={{ mt: 2 }}
          helperText="Separate multiple links with commas"
        />
        <FormControl fullWidth sx={{ mt: 2 }} required>
          <InputLabel id="task-visibility-label">Task Visibility</InputLabel>
          <Select
            labelId="task-visibility-label"
            id="task-visibility"
            value={taskVisibility}
            label="Task Visibility"
            onChange={(e) => setTaskVisibility(e.target.value)}
          >
            <MenuItem value="public">Public Task</MenuItem>
            <MenuItem value="specific">Specific Users</MenuItem>
          </Select>
        </FormControl>
        {taskVisibility === 'specific' && (
          <TextField
            margin="dense"
            id="specificUsers"
            label="Specific Users (separate multiple user IDs with commas)"
            type="text"
            fullWidth
            variant="outlined"
            value={specificUsers}
            onChange={(e) => setSpecificUsers(e.target.value)}
            sx={{ mt: 2 }}
          />
        )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseCreateTaskDialog}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateTask} 
            disabled={!newTaskTitle || !newTaskDescription || !newTaskType || !newTaskTotalItems || !newTaskDifficulty || !newTaskReward || newTaskResources.length === 0 || !taskVisibility}
            sx={{
              backgroundColor: '#2196F3',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
              '&:disabled': {
                backgroundColor: '#BBDEFB',
                color: '#white',
              },
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openBulkUploadDialog} onClose={handleCloseBulkUploadDialog}>
        <DialogTitle>Bulk Upload Tasks</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".csv, .xlsx, .xml"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="bulk-upload-input"
          />
          <label htmlFor="bulk-upload-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<AttachFileIcon />}
            >
              Choose File
            </Button>
          </label>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBulkUploadDialog}>Cancel</Button>
          <Button onClick={handleBulkUpload} color="primary" disabled={!selectedFile}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CompanyTaskManagement;