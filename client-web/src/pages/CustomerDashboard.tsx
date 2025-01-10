import { useState, useEffect } from 'react';
import { Button, Card, TextField, Typography, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';
import { useTickets } from '../hooks';

const CustomerDashboard = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('accessToken') || ''; // Replace with secure token retrieval logic
  const { tickets, fetchTickets, createTicket, loading, error } = useTickets(token);

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async () => {
    if (!subject || !description) {
      alert('Please fill out all fields.');
      return;
    }

    await createTicket(subject, description);

    // Reset form after successful ticket creation
    if (!error) {
      setSubject('');
      setDescription('');
    }
  };

  return (
    <div className="p-5 sm:px-10 lg:px-20 bg-gray-50 min-h-screen">
      <Card className="mb-5 p-5 shadow-lg">
        <Typography variant="h5" className="font-semibold mb-4">
          Customer Dashboard
        </Typography>

        <div className="space-y-5">
          <TextField
            label="Ticket Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Ticket Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <Button
            onClick={handleCreateTicket}
            variant="contained"
            color="primary"
            fullWidth
            className="py-2"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Ticket'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </div>

        <Card className="mt-10 p-5 shadow-lg">
          <Typography className="font-semibold">Your Tickets</Typography>
          {loading && !tickets.length ? (
            <CircularProgress />
          ) : tickets.length === 0 ? (
            <Typography>No tickets found. Create one above.</Typography>
          ) : (
            <List>
              {tickets.map((ticket) => (
                <ListItem key={ticket.id} divider>
                  <ListItemText
                    primary={ticket.subject}
                    secondary={`Created: ${new Date(ticket.createdAt).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Card>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
