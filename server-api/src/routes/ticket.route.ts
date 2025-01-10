// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketController } from '../controllers';
import { AuthMiddleware, validationReq } from '../middlewares';
import { TicketValidation } from '../utils/validation';

const router = Router();
const ticketController = new TicketController();

// Protected route
// region Create Ticket
router.post('/',
    validationReq(TicketValidation.createTicket),
    AuthMiddleware.verifyUser,
    AuthMiddleware.allowRoles(['Customer']),
    ticketController.createTicket
)

// Protected route
// region Fetch Ticket
router.get('/', AuthMiddleware.verifyUser, ticketController.getTicket)

// Protected route
//router.patch('/tickets/:id/status', AuthMiddleware.verifyUser, AuthMiddleware.allowRoles(['Admin']), ticketController.updateTicketStatus);

// Protected route
// region Delete Ticket
router.delete('/:id',
    validationReq(TicketValidation.deleteTicket),
    AuthMiddleware.verifyUser,
    AuthMiddleware.allowRoles(['Admin', 'Customer']),
    ticketController.deleteTicket
)

// Protected route
// region Update Ticket
router.put('/:id',
    validationReq(TicketValidation.updateTicket),
    AuthMiddleware.allowRoles(['Admin']),
    AuthMiddleware.verifyUser,
    ticketController.updateTicket
)

export default router;
