import { Request, Response, NextFunction } from "express";
import { TicketService } from "../services";

class TicketController {
    // Instantiate the AuthService
    constructor(private readonly ticketService: TicketService = new TicketService()) { }

    /**
     * GET ALL TICKETS
     * @param req
     * @param res
     * @param next
     */
    public getTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tickets = await this.ticketService.getTickets();
            if (!tickets) res.status(400).json({
                success: false,
                message: 'Ticket not found'
            });

            res.status(200).json({
                success: true,
                message: "Tickets Fetched",
                tickets
            });

        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    /**
     * CREATE TICKET
     * @param req
     * @param res
     * @param next
     * @returns
     */
    public createTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ticket = await this.ticketService.createTicket(req.body);
            if (!ticket?.success) res.status(400).json(ticket);
            res.status(201).json(ticket);

        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    /**
    * UPDATE TICKET
    * @param req
    * @param res
    * @param next
    * @returns
    */
    public updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ticketId = req.params.id;
            const updated = await this.ticketService.updateTicket({ id: ticketId, ...req.body });
            if (!updated.success) res.status(400).json(updated);
            res.status(201).json(updated);

        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    /**
    * DELETE TICKET
    * @param req
    * @param res
    * @param next
    * @returns
    */
    public deleteTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ticketId = req.params.id;
            const deleted = await this.ticketService.deleteTicket({ ticketId });
            if (!deleted.success) res.status(400).json(deleted);
            res.status(200).json(deleted);

        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}

export default TicketController;
