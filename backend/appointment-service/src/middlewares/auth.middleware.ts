import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      // Llamada al user-service para validar token
      const response = await axios.get(
        `${process.env.USER_SERVICE_URL}/validate-token`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // El user-service debería responder con los datos del usuario si es válido
      req['user'] = response.data.user;

      next();
    } catch (error) {
      console.error('AuthMiddleware error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
