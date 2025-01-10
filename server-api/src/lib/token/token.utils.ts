import * as jwt from 'jsonwebtoken';

class TokenUtils {
    private readonly jwtSecret: string = process.env.JWT_SECRET ?? 'SECRET';

    /**
     * TOKEN GENERATES HERE
     * @param payload
     * @param time
     * @param secret
     * @returns
     */
    public generateToken = (payload: any, time: string = '15m', secret: string = this.jwtSecret): string => {
        // Generate a JWT token
        return jwt.sign(payload, secret, {
            expiresIn: time,
        });
    }

    /**
     * VERIFY THE TOKEN
     * @param token
     * @param secret
     * @returns
     */
    public verifyToken = (token: string, secret: string = this.jwtSecret): any => {
        // Verify the JWT token
        return jwt.verify(token, secret);
    }
}

export default TokenUtils;