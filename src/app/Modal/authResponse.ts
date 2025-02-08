export class AuthResponse {
    idToken: string;
    refreshToken:string;
    expiresIn:string;
    localId: string;
    registered?:	boolean;
    requestType?: "PASSWORD_RESET";
    email: string;
    
}
