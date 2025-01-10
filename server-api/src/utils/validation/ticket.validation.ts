import { z } from 'zod';

class TicketValidation {
  // region Create Ticket
  static createTicket = z.object({
    subject: z.string().min(3, 'Subject is required').max(100, 'Your subject should be maximum 100 characters'),
    description: z.string().max(255, 'Your description should be 255 characters maximum').optional().nullable(),
    status: z.enum(['Open', 'Resolved', 'Closed']),
    customer: z.string().optional(),
    admin: z.string().optional(),
  });

  // region Update Ticket
  static updateTicket = z.object({
    subject: z.string().min(3, 'Subject is required').max(100, 'Your subject should be maximum 100 characters').optional(),
    description: z.string().max(255, 'Your description should be 255 characters maximum').optional(),
    status: z.enum(['Open', 'Resolved', 'Closed']).optional(),
    customer: z.string().optional(),
    admin: z.string().optional(),
  });

  // region Update Ticket Status
  static updateTicketStatus = z.object({
    status: z.enum(['Open', 'Resolved', 'Closed']),
    customer: z.string().optional(),
    admin: z.string().optional(),
  });

  // region Delete Ticket
  static deleteTicket = z.object({
    ticketId: z.string(),
    customer: z.string().optional(),
    admin: z.string().optional(),
  });
}

export default TicketValidation;