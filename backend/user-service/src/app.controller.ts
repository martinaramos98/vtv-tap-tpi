// src/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Req,
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
  authorize(@Body() body: { userId: string; permission: string }) {
    return this.userService.authorize(body.userId, body.permission);
  }
  @Get('validate')
  async validate(@Req() req: Request) {
    const authHeader = req.headers.get('authorization') as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const user = await this.userService.validateToken(token);

    if (!user) throw new UnauthorizedException();

    return { user };
  }
  @Get('user')
  async getUser(@Req() req: Request) {
    const authHeader = req.headers.get('authorization') as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const token: string = authHeader.replace('Bearer ', '').trim();
    const user = await this.userService.validateToken(token);
    if (!user) throw new InternalServerErrorException();
    return user;
  }
}
