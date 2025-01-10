import { useState } from 'react';
import axios from 'axios';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const useTickets = (token: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tickets
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/api/ticket', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data.tickets);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  // Create a new ticket
  const createTicket = async (subject: string, description: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/ticket',
        { subject, description, status: 'Open' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add the new ticket to the current list
      setTickets((prevTickets) => [response.data.ticket, ...prevTickets]);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  // Update Ticket
  const updateTicketStatus = async (ticketId: string, status: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `http://localhost:3001/api/ticket/${ticketId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status } : ticket
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update ticket status');
    } finally {
      setLoading(false);
    }
  };

  // Delete Ticket
  const deleteTicket = async (ticketId: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:3001/api/ticket/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete ticket');
    } finally {
      setLoading(false);
    }
  };


  return { tickets, fetchTickets, createTicket, loading, error, deleteTicket, updateTicketStatus };
};

export default useTickets;
