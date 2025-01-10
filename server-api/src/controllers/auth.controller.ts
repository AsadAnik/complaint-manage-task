import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";

class AuthController {
    // Instantiate the AuthService
    constructor(private readonly authService: AuthService = new AuthService()) { }

    /**
     * AUTH LOGIN USER
     * @param req
     * @param res
     * @param next
     */
    public authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.loginUser({ email, password });

            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            next(error);
        }
    };

    /**
     * AUTH REGISTER USER
     * @param req
     * @param res
     * @param next
     * @returns
     */
    public authRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { firstname, lastname, email, password } = req.body;
            const user = await this.authService.registerUser({ firstname, lastname, email, password });

            if (!user) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            res.status(201).json({
                message: "User created successfully",
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
