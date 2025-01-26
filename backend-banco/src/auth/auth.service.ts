import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { last } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async login(username: string, password: string) {
    // Aquí debería ir la lógica para validar el usuario y contraseña
    if (username === 'admin' && password === 'admin') {
      const payload = { username, sub: 1 };
      return {
        id: 1,
        username: 'admin',
        name: 'Juan Camilo1',
        lastname: 'Llamas',
        email: 'ing.jcllamas@gmail.com',
        roles: ['admin'],
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
