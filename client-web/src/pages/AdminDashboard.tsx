import { useEffect } from 'react';
import { Button, Card, Typography, CircularProgress, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTickets } from '../hooks';

const AdminDashboard = () => {
  const token = localStorage.getItem('accessToken') || ''; // Replace with secure token retrieval
  const { tickets, fetchTickets, updateTicketStatus, deleteTicket, loading, error } = useTickets(token);

  const columns = [
    { field: 'id', headerName: 'Ticket ID', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 200 },
  ];

  const handleResolveTicket = async (selectionModel: any) => {
    for (const id of selectionModel) {
      await updateTicketStatus(id as string, 'Resolved');
    }
  };

  const handleDeleteTicket = async (selectionModel: any) => {
    for (const id of selectionModel) {
      await deleteTicket(id as string);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-5 sm:px-10 lg:px-20 bg-gray-50 min-h-screen">
      <Card className="mb-5 p-5 shadow-lg">
        <Typography variant="h5" className="font-semibold mb-4">
          Admin Dashboard
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            <Typography className="mb-4">
              You have {tickets.filter((t) => t.status === 'Open').length} open tickets. Review and take action on them.
            </Typography>

            <div className="h-72 sm:h-96">
              <DataGrid
                rows={tickets.map((ticket) => ({
                  ...ticket,
                  customer: `${ticket.customerFirstname} ${ticket.customerLastname}`, // Adjust to actual data format
                }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                className="w-full"
                checkboxSelection
              />
            </div>

            <div className="flex gap-4 mt-5">
              <Button
                onClick={() =>
                  handleResolveTicket(tickets.filter((t) => t.status === 'Open').map((t) => t.id))
                }
                variant="contained"
                color="primary"
                className="flex-1 py-2"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Resolve Ticket'}
              </Button>

              <Button
                onClick={() =>
                  handleDeleteTicket(tickets.filter((t) => t.status !== 'Deleted').map((t) => t.id))
                }
                variant="outlined"
                color="secondary"
                className="flex-1 py-2"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete Ticket'}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;
