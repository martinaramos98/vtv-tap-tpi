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
        `${process.env.USER_SERVICE_URL}/auth/validate`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      (req as any).user = response.data;

      next();
    } catch (error) {
      console.error('AuthMiddleware error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
