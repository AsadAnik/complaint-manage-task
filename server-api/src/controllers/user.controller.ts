import { Request, Response, NextFunction } from 'express';
import { AuthService, UserService } from '../services';

class UserController {
    private readonly authService: AuthService;
    private readonly userService: UserService;

    constructor(authService: AuthService = new AuthService(), userService: UserService = new UserService()) {
        this.authService = authService;
        this.userService = userService;
    }


    /**
     * LOGOUT USER NOW
     * @param req Request
     * @param res Resonse
     * @param next NextFunction
     */
    public logoutUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const loggedOutUser = await this.authService.logoutUser(req.body);
            if (!loggedOutUser?.success || !loggedOutUser) res.status(400).json(loggedOutUser);
            res.status(200).json(loggedOutUser);

        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    /**
     * RENEW TOKEN CONTROLLER
     * @param req Request
     * @param res Resonse
     * @param next NextFunction
     */
    public renewToken = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;
            const renewToken = await this.authService.renewAccessToken(refreshToken);
            if (!renewToken?.success || !renewToken) res.status(400).json(renewToken);
            res.status(200).json(renewToken);

        } catch (error) {
            console.error(`Getting error while renew the accesstoken!`);
            next(error);
        }
    };

    /**
     * GET MY PROFILE CONTROLLER
     * @param req 
     * @param res 
     * @param next 
     */
    public getMyProfile = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getMyProfile((req as any).user.id);
            if (!user?.success || !user) res.status(400).json(user);
            res.status(200).json(user);

        } catch (error) {
            console.error(`Getting error while getting user profile!`);
            next(error);
        }
    }
}

export default UserController;