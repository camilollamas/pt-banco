import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        id: number;
        username: string;
        name: string;
        lastname: string;
        email: string;
        roles: string[];
        access_token: string;
    }>;
}
