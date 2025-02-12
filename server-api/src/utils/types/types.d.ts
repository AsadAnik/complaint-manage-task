import { User } from '../../db/models';

declare global {
    namespace Express {
        interface Request {
            user?: User; // Add `user` to the Request interface
        }
    }
}
