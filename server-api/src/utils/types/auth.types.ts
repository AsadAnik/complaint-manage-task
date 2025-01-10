/**
 * REGISTER USER INTERFACE
 * This will be using register user request
 */
export interface IAuthRegisterRequestType {
    firstname: string;
    lastname?: string;
    email: string;
    password: string;
}

/**
 * LOGIN RQUEST INTERFACE
 * This will be using whle loging to the system
 */
export interface IAuthLoginRequestType {
    email: string;
    password: string;
}

/**
 * LOGOUT REQUEST INTERFACE
 * This will use while logout the user
 */
export interface IAuthLogoutRequestType {
    refreshToken: string;
}