import {User} from "../db/models";
import {AppDataSourceHandler} from "../lib/data-source";
import {BcryptUtils} from "../lib/bcrypt";
import {TokenUtils} from "../lib/token";
import {IAuthRegisterRequestType, IAuthLoginRequestType, IAuthLogoutRequestType} from "../utils/types";

class AuthService {
    private readonly bcryptUtils: BcryptUtils;
    private readonly userRepository: any;
    private readonly tokenUtils: TokenUtils;

    constructor() {
        this.userRepository = AppDataSourceHandler.getInstance().getRepository(User);
        this.bcryptUtils = new BcryptUtils();
        this.tokenUtils = new TokenUtils();
    }

    /**
     * GENERATE ACCESS/REFRESH TOKEN
     * Internal function for refresh and access token
     * @param userId
     * @returns { accessToken: string, refreshToken: string }
     */
    private generateAccessRefreshToken(userId: string): { accessToken: string; refreshToken: string; } {
        const accessToken = this.tokenUtils.generateToken({userId});
        const refreshToken = this.tokenUtils.generateToken({userId}, '7d', process.env.JWT_REFRESH_TOKEN_SECRET);
        return {accessToken, refreshToken};
    }

    /**
     * REGISTER SERVICE FOR AUTH
     * @returns
     * @param userInfo
     */
    public async registerUser(userInfo: IAuthRegisterRequestType): Promise<any> {
        const existsUser = await this.userRepository.findOne({where: {email: userInfo.email}});
        if (existsUser) return false;

        // Hashed the password
        const hashedPassword = await this.bcryptUtils.hash(userInfo.password);

        // Create a new user
        const user = new User();
        user.firstname = userInfo.firstname;
        user.lastname = userInfo?.lastname ?? '';
        user.email = userInfo.email;
        user.password = hashedPassword;
        await this.userRepository.save(user);

        return user;
    }

    /**
     * LOGIN SERVICE FOR AUTH
     * @returns
     * @param userInfo
     */
    public async loginUser(userInfo: IAuthLoginRequestType): Promise<any> {
        const user = await this.userRepository.findOne({where: {email: userInfo.email}});
        if (!user) return false;

        // Compare the password
        const isPasswordValid = await this.bcryptUtils.compare(userInfo.password, user.password);
        if (!isPasswordValid) return false;

        // Generate a JWT token on successful login
        const newTokens = this.generateAccessRefreshToken(user.id);

        user.refreshToken = newTokens.refreshToken;
        await this.userRepository.save(user);

        // Remove Password for response..
        delete user.password;

        return {
            user,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken
        }
    }


    /**
     * LOGOUT USER
     * User will be logout by this server here
     * @params userInfo IAuthLogoutRequestType
     */
    public async logoutUser(userInfo: IAuthLogoutRequestType): Promise<any> {
        const {refreshToken} = userInfo;
        const user = await this.userRepository.findOne({where: {refreshToken}});
        if (!user) return {
            success: false,
            message: 'User not found according to the refresh token'
        };

        // Delete the refresh token from the user
        user.refreshToken = null;
        await this.userRepository.save(user);

        return {success: true, message: 'User loggedout successfully'};
    }

    /**
     * RENEW ACCESS TOKEN
     * This is rourting the expired access-token to be renewing process
     */
    public async renewAccessToken(refreshToken: string): Promise<any> {
        // verify the refreshToken with decode..
        const decoded = await this.tokenUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        if (!decoded) return {
            success: false,
            message: 'Invalid or expired refresh token',
        };

        // User Find..
        const user = await this.userRepository.findOne({where: {id: decoded.userId}});
        if (!user) return {
            success: false,
            message: 'User not found!',
        }

        // Generate new tokens.. (Access & Refresh Renewel)
        const newTokens = this.generateAccessRefreshToken(user.id);

        user.refreshToken = newTokens.refreshToken;
        await this.userRepository.save(user);

        return {
            success: true,
            message: 'Token has been renewed & rotated Successfully!',
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken
        };
    }
}

export default AuthService;
