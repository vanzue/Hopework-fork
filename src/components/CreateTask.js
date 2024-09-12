import React, { useState } from 'react';
import { 
  TextField, Button, Typography, Container, FormControlLabel, Checkbox,
  Select, MenuItem, InputLabel, FormControl, Box, ImageList, ImageListItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const navigate = useNavigate();
  const [taskType, setTaskType] = useState('');
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle task creation logic
    // Assume task creation is successful
    // Redirect to task management page after success
    navigate('/tasks');
  };

  const handleTaskTypeChange = (event) => {
    setTaskType(event.target.value);
    setShowLabelInput(event.target.value === 'Image classification');
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setUploadedImages(prevImages => [...prevImages, ...images]);
    });
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Task Description"
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Task Type</InputLabel>
          <Select
            value={taskType}
            label="Task Type"
            onChange={handleTaskTypeChange}
          >
            <MenuItem value="Image classification">Image classification</MenuItem>
            <MenuItem value="Object detection">Object detection</MenuItem>
          </Select>
        </FormControl>
        {showLabelInput && (
          <TextField
            fullWidth
            margin="normal"
            label="Labels (comma-separated)"
            variant="outlined"
            required
          />
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Task Quantity"
          type="number"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Difficulty"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reward"
          type="number"
          variant="outlined"
          required
        />
        <Box sx={{ marginTop: '1rem' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Images
            </Button>
          </label>
        </Box>
        {uploadedImages.length > 0 && (
          <Box sx={{ marginTop: '1rem' }}>
            <ImageList sx={{ width: '100%', height: 200 }} cols={4} rowHeight={100}>
              {uploadedImages.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Public Task"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default CreateTask;