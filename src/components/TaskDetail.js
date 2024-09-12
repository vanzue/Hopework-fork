import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, LinearProgress, Grid } from '@mui/material';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const task = {
    id,
    name: `Task ${id}`,
    description: 'This is a sample task description.',
    progress: 65,
    assignedWorkers: 10,
    completedTasks: 65,
    status: 'In Progress'
  };

  const handlePauseTask = () => {
    // Implement pause logic
    console.log('Task paused');
  };

  const handleCancelTask = () => {
    // Implement cancel logic
    console.log('Task cancelled');
  };

  const handleAcceptTask = () => {
    navigate(`/acceptance/${id}`);
  };

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Task Details</Typography>
      <Typography variant="h6">{task.name}</Typography>
      <Typography paragraph>{task.description}</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Typography>Progress:</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <LinearProgress variant="determinate" value={task.progress} />
        </Grid>
      </Grid>
      <Typography>Assigned Workers: {task.assignedWorkers}</Typography>
      <Typography>Completed Tasks: {task.completedTasks}</Typography>
      <Typography>Status: {task.status}</Typography>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        <Grid item>
          <Button variant="contained" onClick={handlePauseTask}>Pause Task</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleCancelTask}>Cancel Task</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAcceptTask}>Accept Task</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TaskDetail;