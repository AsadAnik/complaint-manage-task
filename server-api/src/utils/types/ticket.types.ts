/**
 * TICKET INTERFACE
 * Using for in generate define ticket resource
 * Like if we want to use it into the lists to get tickets
 */
export interface ITicket {
    id: string;
    subject: string;
    descripton: string;
    status: string;
    customer?: string;
    admin?: string;
}

/**
 * TICKET CREATE INTERFACE
 * Using for creae ticket resource
 */
export interface ITicketCreate {
    subject: string;
    description?: string;
    status: string;
    customer?: string;
    admin?: string;
}

/**
 * TICKET UPDATE INTERFACE
 * Using for update ticket resource
 */
export interface ITicketUpdate {
    id: string;
    subject?: string;
    description?: string;
    status?: string;
    customer?: string;
    admin?: string;
}

/**
 * TICKET DELETE INTERFACE
 * Using for delete ticket resource
 */
export interface ITicketDelete {
    ticketId: string;
}

/**
 * TICKET STATUS UPDATE INTERFACE
 * Using for update ticket status update
 */
export interface ITicketStatusUpdate {
    ticketId: string;
    status: string;
}