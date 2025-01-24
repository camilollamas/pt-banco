import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(username: string, password: string): Promise<{
        id: number;
        username: string;
        name: string;
        lastname: string;
        email: string;
        roles: string[];
        access_token: string;
    }>;
    validateToken(token: string): Promise<any>;
}
