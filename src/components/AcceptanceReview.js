import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

function AcceptanceReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const results = [
    { id: 1, description: 'Task result 1', quality: 'Good' },
    { id: 2, description: 'Task result 2', quality: 'Excellent' },
    { id: 3, description: 'Task result 3', quality: 'Fair' },
  ];

  const handleAccept = () => {
    // Implement acceptance logic
    console.log('Task accepted');
    navigate('/tasks');
  };

  const handleReject = () => {
    // Implement rejection logic
    console.log('Task rejected');
    navigate('/tasks');
  };

  const handleFeedback = () => {
    // Implement feedback logic
    console.log('Feedback provided');
  };

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Acceptance Review</Typography>
      <List>
        {results.map((result) => (
          <ListItem key={result.id}>
            <ListItemText primary={result.description} secondary={`Quality: ${result.quality}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleAccept} sx={{ marginRight: '1rem' }}>
        Accept
      </Button>
      <Button variant="contained" color="secondary" onClick={handleReject} sx={{ marginRight: '1rem' }}>
        Reject
      </Button>
      <Button variant="contained" onClick={handleFeedback}>
        Provide Feedback
      </Button>
    </Container>
  );
}

export default AcceptanceReview;