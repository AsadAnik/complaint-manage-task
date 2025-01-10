import { User } from "../db/models";
import { AppDataSourceHandler } from "../lib/data-source";

class UserService {
    private readonly userRepository: any;

    constructor() {
        this.userRepository = AppDataSourceHandler.getInstance().getRepository(User);
    }

    /**
     * GET MY PROFILE SERVICE
     * User individual profile
     * @param userId
     * @returns
     */
    public async getMyProfile(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) return {
            success: false,
            message: 'User not found',
        }

        // Delete the password/tokens here
        delete user.password;
        delete user.refreshToken;

        return { success: true, message: 'User Profile Details', user };
    }
}

export default UserService;
