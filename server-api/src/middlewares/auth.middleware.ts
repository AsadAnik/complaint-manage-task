import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models';
import { AppDataSourceHandler } from '../lib/data-source';
import { TokenUtils } from '../lib/token';

class AuthMiddleware {
    /**
     * VERIFY THE TOKEN
     * Verify the user token for checking the auth with middleware
     * @param req
     * @param res
     * @param next
     * @returns
     */
    static verifyUser = async (req: Request | any, res: Response | any, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            // Verify the JWT token
            const decoded = new TokenUtils().verifyToken(token);
            const userRepository = AppDataSourceHandler.getInstance().getRepository(User);

            // Check if the user exists
            const user = await userRepository.findOne({ where: { id: decoded.userId } });
            if (!user) return res.status(401).json({ message: 'Unauthorized' });

            req.user = user;

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    /**
     * ALLOW ROLES FOR AUTH
     * Only including the roles between Admin or Customer
     * @param roles
     * @returns
     */
    static allowRoles = (roles: ('Admin' | 'Customer')[]) => {
        return (req: Request | any, res: Response | any, next: NextFunction) => {
            const user = req?.user;

            if (!user || !roles.includes(user?.role)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
            }

            next();
        };
    }
}


export default AuthMiddleware;