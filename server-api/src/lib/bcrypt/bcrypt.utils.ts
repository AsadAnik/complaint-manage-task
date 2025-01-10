import bcrypt from 'bcrypt';

class BcryptUtils {
    private readonly saltRounds: number = Number(process.env.PASSWORD_SALT) ?? 10;

    /**
     * HASH PASSWORD / HASH TOKEN
     * We are hasing the password and hashing he refresh token
     * @param password
     * @returns
     */
    public hash = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    };

    /**
     * COMPARE PASSWORD / COMPARE TOKEN
     * Using for compare password
     * Also using to compare refresh token
     * @param password
     * @param hash
     * @returns
     */
    public compare = async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    };
}

export default BcryptUtils;