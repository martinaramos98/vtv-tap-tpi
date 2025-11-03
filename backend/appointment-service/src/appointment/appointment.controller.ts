// src/appointment/appointment.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('reserve')
  create(
    @Body()
    body: {
      matricula: string;
      date: number;
    },
    @Req() req: Request & { user?: { decoded?: { sub?: string } } },
  ) {
    const data = { ...body, date: new Date(body.date) };
    return this.appointmentService.create({
      ...data,
      clientId: req.user?.decoded?.sub ?? '',
    });
  }

  @Get()
  findByClient(
    @Req() req: Request & { user?: { decoded?: { sub?: string } } },
  ) {
    if (!req.user?.decoded?.sub) {
      throw new UnauthorizedException('Invalid Token');
    }
    return this.appointmentService.findByClient(req.user?.decoded?.sub);
  }

  @Get('by-matricula')
  findByMatricula(
    @Query('matricula') matricula: string,

    @Req() req: Request & { user?: { decoded?: { sub?: string } } },
  ) {
    if (!req.user?.decoded?.sub) {
      throw new UnauthorizedException('Invalid Token');
    }
    return this.appointmentService.findByMatricula(
      matricula,
      req.user?.decoded?.sub,
    );
  }
}
