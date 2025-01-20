import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LoginDto } from './dto/login-dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('Deberia devolver datos del usuario y token.', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test' };
      const token = 'testToken';

      jest.spyOn(authService, 'login').mockResolvedValue(token as any);
      expect(await authController.login(loginDto)).toBe(token);
    });

    it('Debería lanzar UnauthorizedException cuando las credenciales no sean válidas', async () => {
      const loginDto = { username: 'test', password: 'wrongPassword' };
      jest.spyOn(authService, 'login').mockResolvedValue(null);

      await expect(authController.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});