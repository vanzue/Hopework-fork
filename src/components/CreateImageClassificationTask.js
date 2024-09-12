import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Paper, Button, Box,
  TextField, Chip, IconButton
} from '@mui/material';

function CreateImageClassificationTask() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [images, setImages] = useState([]);
  const [labels, setLabels] = useState([]);
  const [currentLabel, setCurrentLabel] = useState('');

  const handleAddImage = () => {
    // 添加图片逻辑
    setImages([...images, { url: 'https://example.com/placeholder.jpg' }]);
  };

  const handleAddLabel = () => {
    if (currentLabel && !labels.includes(currentLabel)) {
      setLabels([...labels, currentLabel]);
      setCurrentLabel('');
    }
  };

  const handleCreateTask = () => {
    // 创建任务逻辑
    console.log('Task created:', { taskName, images, labels });
    navigate('/user/my-tasks');
  };

  const handleBack = () => {
    navigate('/user/my-tasks');
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', paddingTop: '2rem' }}>
      <IconButton 
        onClick={handleBack} 
        sx={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '1.5rem' }}
      >
        ←
      </IconButton>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          Create Image Classification Task
        </Typography>
        <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
          <TextField
            fullWidth
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            margin="normal"
          />
          <Box sx={{ marginY: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Images ({images.length})
            </Typography>
            <Button variant="contained" onClick={handleAddImage}>
              Add Image
            </Button>
          </Box>
          <Box sx={{ marginY: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <TextField
                label="New Label"
                value={currentLabel}
                onChange={(e) => setCurrentLabel(e.target.value)}
                sx={{ marginRight: '1rem' }}
              />
              <Button variant="contained" onClick={handleAddLabel}>
                Add Label
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {labels.map((label, index) => (
                <Chip key={index} label={label} />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <Button variant="contained" color="primary" onClick={handleCreateTask}>
              Create Task
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreateImageClassificationTask;