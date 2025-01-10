import { Ticket } from "../db/models";
import { AppDataSourceHandler } from "../lib/data-source";
import { BcryptUtils } from "../lib/bcrypt";
import { TokenUtils } from "../lib/token";
import { ITicket, ITicketCreate, ITicketUpdate, ITicketDelete } from "../utils/types";

class TicketService {
    private readonly ticketRepository: any;

    constructor() {
        this.ticketRepository = AppDataSourceHandler.getInstance().getRepository(Ticket);
    }

    /**
     * CREATE TICKET SERVICE
     * @returns
     * @param ticketInfo
     */
    public async createTicket(ticketInfo: ITicketCreate): Promise<any> {
        const ticket = new Ticket();
        ticket.subject = ticketInfo.subject;
        ticket.description = ticketInfo.description ?? '';
        // @ts-ignore
        ticket.status = ticketInfo.status ?? 'Open';
        // @ts-ignore
        ticket.admin = ticketInfo.admin ?? null;
        // @ts-ignore
        ticket.customer = ticketInfo.customer ?? null;
        await this.ticketRepository.save(ticket);

        if (!ticket) return {
            success: false,
            message: 'Can not create ticket!',
        }

        return { success: true, message: 'Ticket created successful', ticket };
    }

    /**
     * UPDATE TICKET SERVICE
     * @returns
     * @param ticketUpdateInfo
     */
    public async updateTicket(ticketUpdateInfo: ITicketUpdate): Promise<any> {
        const ticket = await this.ticketRepository.findOne({ where: { id: ticketUpdateInfo.id } });
        if (!ticket) return {
            success: false,
            message: 'Ticket not found',
        }

        // update ticket data..
        ticket.subject = ticketUpdateInfo.subject;
        ticket.descripton = ticketUpdateInfo.description;
        ticket.status = ticketUpdateInfo.status;
        await this.ticketRepository.save(ticket);

        return {
            success: true,
            message: 'Updated ticket successfully',
            ticket,
        };
    }

    /**
     * GET TICKETS SERVICE
     * @returns
     */
    public async getTickets(): Promise<any> {
       const tickets = await this.ticketRepository.find({});
       if (!tickets) return {
           success: false,
           message: 'Tickets empty',
       };

       return tickets as ITicket[];
    }

    /**
     * DELETE TICKET SERVICE
     * @returns
     * @param ticketDeleteInfo
     */
    public async deleteTicket(ticketDeleteInfo: ITicketDelete): Promise<any> {
        const ticket = await this.ticketRepository.findOne({ where: { id: ticketDeleteInfo.ticketId } });
        if (!ticket) return {
            success: false,
            message: 'Ticket can not delete',
        };

        return {
            success: true,
            message: 'Deleted Ticket Successfully',
        };
    }
}

export default TicketService;
