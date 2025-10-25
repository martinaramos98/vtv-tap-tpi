// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
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
}
