// src/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Headers,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './app.service';
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(
    @Body()
    body: {
      email: string;
      password: string;
      role: 'Administrator' | 'Client';
    },
  ) {
    return this.userService.signup(body.email, body.password, body.role);
  }

  @Post('signin')
  signin(@Body() body: { email: string; password: string }) {
    return this.userService.signin(body.email, body.password);
  }

  @Post('assign-permission')
  assignPermission(@Body() body: { role: string; permission: string }) {
    return this.userService.assignPermissionToRole(body.role, body.permission);
  }

  @Post('authorize')
  authorize(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const token: string = authHeader.replace('Bearer ', '').trim();
    const decoded = this.userService.validateToken(token);
    return decoded;
  }

  @Get('validate')
  validate(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = this.userService.validateToken(token);

    if (!decoded) throw new UnauthorizedException();

    return { decoded };
  }

  @Get('user')
  async getUser(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const token: string = authHeader.replace('Bearer ', '').trim();
    const decoded = this.userService.validateToken(token);
    if (!decoded) throw new UnauthorizedException();
    const user = await this.userService.getUserById(decoded.sub);
    if (!user) throw new InternalServerErrorException();
    return user;
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
