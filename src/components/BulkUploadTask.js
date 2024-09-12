import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BulkUploadTask() {
  const navigate = useNavigate();

  const handleUpload = () => {
    // Implement file upload logic here
    console.log('File uploaded');
    navigate('/tasks');
  };

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Bulk Upload Tasks</Typography>
      <Box sx={{ marginTop: '1rem' }}>
        <input
          accept=".csv,.xlsx,.xls"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload and Publish
        </Button>
      </Box>
    </Container>
  );
}

export default BulkUploadTask;