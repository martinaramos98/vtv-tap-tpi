import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScoreService } from '../services/scoring.service';
import { Score } from '../models/scoring.model';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() data: Partial<Score>) {
    return this.scoreService.create(data);
  }

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get('completed')
  findAllCompleted() {
    return this.scoreService.findAllCompleted();
  }

  @Get('appointment/:appointmentId')
  findByAppointment(@Param('appointmentId') appointmentId: string) {
    return this.scoreService.findByAppointment(appointmentId);
  }
}
