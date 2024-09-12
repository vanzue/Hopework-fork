import React from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PaymentManagement() {
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const payments = [
    { id: 1, taskName: 'Task 1', amount: 100, status: 'Pending' },
    { id: 2, taskName: 'Task 2', amount: 200, status: 'Completed' },
    { id: 3, taskName: 'Task 3', amount: 150, status: 'Pending' },
  ];

  const handleViewDetails = (id) => {
    navigate(`/payment/${id}`);
  };

  const handleInitiatePayment = (id) => {
    // Implement payment logic
    console.log(`Payment initiated for task ${id}`);
    // Update payment status
  };

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Payment Management</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.taskName}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(payment.id)}>View Details</Button>
                  {payment.status === 'Pending' && (
                    <Button onClick={() => handleInitiatePayment(payment.id)}>Initiate Payment</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PaymentManagement;