import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, List, ListItem, ListItemText,
  Dialog, DialogContentText, DialogTitle, LinearProgress,
  DialogContent, DialogActions
} from '@mui/material';

function AcceptanceReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ feedbackDialog, setOpenFeedbackDialog] = useState(false);

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

  const handleCloseDialog = () => {
    setOpenFeedbackDialog(false);
  };

  const handleAcceptTask = () => {
    fetch(`https://hopeworkapi.azurewebsites.net/api/task/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to accept task');
      }
      return response.json();
    })
    .then(data => {
      alert('You have successfully accepted the task');
      setOpenFeedbackDialog(false);
      navigate('/company/tasks');
    })
    .catch(error => {
      console.error('Error accepting task:', error);
      alert('Failed to accept task. Please try again.');
    });
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
      <Button variant="contained" onClick={() => setOpenFeedbackDialog(true)}>
        Provide Feedback
      </Button>

      <Dialog open={feedbackDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to apply for this task? Once applied, you'll be responsible for completing it before the deadline.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Completion Status
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAcceptTask} color="success" variant="contained">
            Accept Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AcceptanceReview;