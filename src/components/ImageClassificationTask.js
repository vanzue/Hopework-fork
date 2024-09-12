import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Button, Box, 
  Grid, Chip, IconButton
} from '@mui/material';

function ImageClassificationTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - replace with actual data fetching
  const task = {
    id,
    name: `Image Classification Task ${id}`,
    images: [
      { url: 'https://example.com/image1.jpg', labels: ['Cat', 'Dog', 'Bird', 'Fish'] },
      { url: 'https://example.com/image2.jpg', labels: ['Car', 'Truck', 'Bike', 'Bus'] },
      // Add more images...
    ],
  };

  const handleClassify = (label) => {
    // Logic to handle classification
    console.log(`Image ${currentImageIndex} classified as ${label}`);
    handleNextImage();
  };

  const handleNextImage = () => {
    if (currentImageIndex < task.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Task completed
      navigate('/user/my-tasks');
    }
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
          {task.name}
        </Typography>
        <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
          <Box sx={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', marginBottom: '2rem' }}>
            {/* Replace this Box with an actual Image component when you have image URLs */}
            <Typography variant="body1" align="center" sx={{ paddingTop: '180px' }}>
              Image {currentImageIndex + 1}
            </Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {task.images[currentImageIndex].labels.map((label, index) => (
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
            <Button variant="contained" color="primary" onClick={handleNextImage}>
              Next Image
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ImageClassificationTask;