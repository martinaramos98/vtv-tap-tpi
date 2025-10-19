import { Controller, Get, Body, Post } from '@nestjs/common';
import { UserService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(
    @Body()
    body: {
      email: string;
      password: string;
      fullName: string;
      role: 'Administrator' | 'Client';
    },
  ) {
    return this.userService.signup(body.email, body.password, body.role);
  }

  @Post('signin')
  signin(@Body() body: { email: string; password: string }) {
    return this.userService.signin(body.email, body.password);
  }

  @Get()
  getStatus(): { status: string } {
    return { status: 'ok' };
  }
}
