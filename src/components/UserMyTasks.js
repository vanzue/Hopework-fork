import React from 'react';
import { 
  Container, Typography, Grid, Button, Chip, 
  LinearProgress, Box, Card, CardContent, CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserMyTasks() {
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const myTasks = [
    { id: 1, name: 'Image Classification', type: 'Image', difficulty: 'Easy', reward: 10, status: 'In Progress', progress: 30 },
    { id: 2, name: 'Text Translation', type: 'Text', difficulty: 'Medium', reward: 20, status: 'Not Started', progress: 0 },
    { id: 3, name: 'Data Entry', type: 'Data', difficulty: 'Easy', reward: 15, status: 'Completed', progress: 100 },
  ];

  const handleStartWorking = (id, type) => {
    if (type === 'Image') {
      navigate(`/user/task/image-classification/${id}`);
    } else {
      // Handle other task types
      console.log(`Starting work on task ${id}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        My Tasks
      </Typography>
      <Grid container spacing={3}>
        {myTasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.name}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Chip label={task.type} color="primary" size="small" />
                  </Grid>
                  <Grid item>
                    <Chip 
                      label={task.difficulty} 
                      color={task.difficulty === 'Easy' ? 'success' : task.difficulty === 'Medium' ? 'warning' : 'error'}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Reward: ${task.reward}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Status: {task.status}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>Progress:</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={task.progress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" align="right">{task.progress}%</Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  variant="contained"
                  onClick={() => handleStartWorking(task.id, task.type)}
                  disabled={task.status === 'Completed'}
                >
                  {task.status === 'Completed' ? 'Completed' : 'Start Working'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserMyTasks;