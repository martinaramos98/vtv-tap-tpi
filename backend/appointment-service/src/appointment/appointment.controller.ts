// src/appointment/appointment.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('reserve')
  create(
    @Body()
    body: {
      matricula: string;
      clientId: string;
      date: string;
    },
  ) {
    const data = { ...body, date: new Date(body.date) };
    return this.appointmentService.create(data);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('by-matricula')
  findByMatricula(@Query('matricula') matricula: string) {
    return this.appointmentService.findByMatricula(matricula);
  }
}
