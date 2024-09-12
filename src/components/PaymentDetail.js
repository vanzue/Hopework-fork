import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Grid } from '@mui/material';

function PaymentDetail() {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const payment = {
    id,
    taskName: `Task ${id}`,
    amount: 150,
    status: 'Pending',
    allocationRule: 'Equal distribution',
    paymentDate: 'N/A'
  };

  return (
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Payment Details</Typography>
      <Paper sx={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Task Name:</Typography>
            <Typography>{payment.taskName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Amount:</Typography>
            <Typography>${payment.amount}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Status:</Typography>
            <Typography>{payment.status}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Allocation Rule:</Typography>
            <Typography>{payment.allocationRule}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Payment Date:</Typography>
            <Typography>{payment.paymentDate}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PaymentDetail;