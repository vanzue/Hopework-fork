import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, TextField, Select, MenuItem, FormControl, 
  InputLabel, Grid, Card, CardContent, Chip, InputAdornment, Box, CardActions, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

function UserTaskList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState('');
  const [newTaskTotalItems, setNewTaskTotalItems] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('');
  const [newTaskReward, setNewTaskReward] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [taskVisibility, setTaskVisibility] = useState('');
  const [specificUsers, setSpecificUsers] = useState('');
  const [openBulkUploadDialog, setOpenBulkUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://hopeworkapi.azurewebsites.net/api/task/list');
      if (!response.ok) {
        throw new Error('Failed to fetch task list');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching task list:', error);
      // Mock data
      const mockTasks = [
        { id: 1, title: 'Image Classification', type: 'Image', status: "pending", difficulty: 'Easy', reward_per_unit: 10, deadline: '2023-12-31', total_units: 100, completed_units: 10, description: 'Classify images by identifying the main objects or scenes within them.' },
        { id: 2, title: 'Text Translation', type: 'Text', status: "Available", difficulty: 'Medium', reward_per_unit: 20, deadline: '2023-12-31', total_units: 100, completed_units: 15, description: 'Translate given text from one language to another while preserving the original meaning.' },
        { id: 3, title: 'Data Entry', type: 'Data', status: "pending", difficulty: 'Easy', reward_per_unit: 15, deadline: '2023-12-31', total_units: 30, completed_units: 30, description: 'Accurately input provided information into specified databases or spreadsheets.' },
        { id: 4, title: 'Audio Transcription', type: 'Audio', status: "pending", difficulty: 'Hard', reward_per_unit: 30, deadline: '2023-12-31', total_units: 100, completed_units: 41, description: 'Transcribe audio files into text, including speaker identification and timestamps.' },
        { id: 5, title: 'Sentiment Analysis', type: 'Text', status: "Available", difficulty: 'Medium', reward_per_unit: 25, deadline: '2023-12-31', total_units: 100, completed_units: 20, description: 'Analyze text content to determine its sentiment (positive, negative, or neutral).' },
        { id: 6, title: 'Video Annotation', type: 'Video', status: "pending", difficulty: 'Hard', reward_per_unit: 35, deadline: '2023-12-31', total_units: 10, completed_units: 5, description: 'Add annotations to videos, including object tagging, action descriptions, and scene classification.' },
        { id: 7, title: 'Speech Recognition', type: 'Audio', status: "Available", difficulty: 'Medium', reward_per_unit: 28, deadline: '2023-12-31', total_units: 40, completed_units: 20, description: 'Convert speech to text, recognizing different accents and dialects.' },
        { id: 8, title: 'Image Segmentation', type: 'Image', status: "pending", difficulty: 'Hard', reward_per_unit: 40, deadline: '2023-12-31', total_units: 100, completed_units: 0, description: 'Segment images into multiple semantic regions, precisely labeling each pixel.' },
      ];
      setTasks(mockTasks);
    }
  };

  const handleViewTask = (id) => {
    navigate(`/user/task/${id}`);
  };

  const handlePauseTask = (id) => {
    // Send a request to pause the task
    fetch(`/api/task/${id}/pause`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task paused:', data);
      navigate('/user/my-tasks');
    })
    .catch(error => {
      console.error('Error pausing task:', error);
      alert('Failed to pause task. Please try again.');
    });
  };

  const handleCancelTask = (id) => {
    // Send a request to cancel the task
    fetch(`/api/task/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task cancelled:', data);
      navigate('/user/my-tasks');
    })
    .catch(error => {
      console.error('Error cancelling task:', error);
      alert('Failed to cancel task. Please try again.');
    });
  };

  const handleCreateTask = () => {
    // Send a request to create a new task
    fetch('/api/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: newTaskTitle,
        description: newTaskDescription,
        type: newTaskType, 
        totalItems: newTaskTotalItems, 
        difficulty: newTaskDifficulty, 
        reward: newTaskReward, 
        deadline: newTaskDeadline,
        taskVisibility: taskVisibility,
        specificUsers: specificUsers
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task created:', data);
      navigate('/user/my-tasks');
    })
    .catch(error => {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
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
    fetch('/api/task/batch-upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Bulk task upload successful:', data);
      navigate('/user/my-tasks');
    })
    .catch(error => {
      console.error('Error during bulk task upload:', error);
      alert('Bulk upload of tasks failed, please try again');
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
    setOpenCreateTaskDialog(false);
  };

  const handleOpenBulkUploadDialog = () => {
    setOpenBulkUploadDialog(true);
  };

  const handleCloseBulkUploadDialog = () => {
    setSelectedFile(null);
    setOpenBulkUploadDialog(false);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || task.type === filterType) &&
    (filterDifficulty === '' || task.difficulty === filterDifficulty)
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Available Tasks
      </Typography>
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

      <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Image">Image</MenuItem>
              <MenuItem value="Text">Text</MenuItem>
              <MenuItem value="Data">Data</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Filter by Difficulty</InputLabel>
            <Select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              label="Filter by Difficulty"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="h6" component="div" noWrap>
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Type: {task.type}
                  </Typography>
                  <Chip 
                    label={task.difficulty} 
                    color={task.difficulty === 'Easy' ? 'success' : task.difficulty === 'Medium' ? 'warning' : 'error'}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" component="p" sx={{ mb: 0.5 }}>
                  Reward: ${task.reward_per_unit}
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: 0.5 }}>
                  Status: {task.status}
                  {/* {
                    task.completed_units === 0 ? 'Not Started' :
                    task.completed_units === task.total_units ? 'Completed' : 'In Progress'
                  } */}
                </Typography>
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Typography variant="body2" component="p" sx={{ mb: 0.5 }}>
                    Progress: {Math.round((task.completed_units / task.total_units) * 100)}%
                  </Typography>
                  <LinearProgress variant="determinate" value={(task.completed_units / task.total_units) * 100} />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 1, '& > :not(:last-child)': { mr: 0.5 } }}>
                <Button size="small" color="primary" variant="outlined" onClick={() => handleViewTask(task.id)}>
                  View
                </Button>
                <Button size="small" color="warning" variant="outlined" onClick={() => handlePauseTask(task.id)}>
                  Pause
                </Button>
                <Button size="small" color="error" variant="outlined" onClick={() => handleCancelTask(task.id)}>
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              <MenuItem value="Image">Image</MenuItem>
              <MenuItem value="Text">Text</MenuItem>
              <MenuItem value="Data">Data</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
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
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
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
          value={newTaskDeadline || new Date().toISOString().slice(0, 10)}
          onChange={(e) => setNewTaskDeadline(e.target.value)}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
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
          <Button onClick={handleCloseCreateTaskDialog}>Cancel</Button>
          <Button onClick={handleCreateTask} disabled={!newTaskTitle || !newTaskDescription || !newTaskType || !newTaskTotalItems || !newTaskDifficulty || !newTaskReward || !taskVisibility}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openBulkUploadDialog} onClose={handleCloseBulkUploadDialog}>
        <DialogTitle>Bulk Upload Tasks</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".csv, .xlsx"
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

export default UserTaskList;