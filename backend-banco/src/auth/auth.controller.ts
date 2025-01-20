import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login to get access token' })
  @ApiResponse({ status: 201, description: 'Successfully logged in.' })
  async login(
    @Body() loginDto: LoginDto,
  ) {
    const token = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return token;
  }
}
