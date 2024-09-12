import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, LinearProgress, Typography, Container 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TaskManagement() {
  const navigate = useNavigate();

  const tasks = [
    { id: 1, name: 'Task 1', status: 'In Progress', progress: 30 },
    { id: 2, name: 'Task 2', status: 'Completed', progress: 100 },
    // Add more tasks...
  ];

  const handleViewTask = (id) => {
    navigate(`/task/${id}`);
  };

  const handleCreateTask = () => {
    navigate('/create-task');
  };

  const handleBulkUpload = () => {
    navigate('/bulk-upload');
  };

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Task Management</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateTask} style={{ marginRight: '1rem' }}>
        Create New Task
      </Button>
      <Button variant="contained" color="secondary" onClick={handleBulkUpload}>
        Bulk Upload Tasks
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={task.progress} />
                </TableCell>
                <TableCell>
                  <Button size="small" color="primary" onClick={() => handleViewTask(task.id)}>View</Button>
                  <Button size="small">Pause</Button>
                  <Button size="small" color="secondary">Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TaskManagement;