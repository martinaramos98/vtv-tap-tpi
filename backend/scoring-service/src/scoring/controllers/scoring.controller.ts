import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScoreService } from '../services/scoring.service';
import { ScoresCreateDTO } from '../interfaces/Scores';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() data: ScoresCreateDTO[]) {
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

  @Get('service-points')
  getAllServicePoints() {
    return this.scoreService.getAllServicePoints();
  }

  @Get(':appointmentId')
  findByAppointment(@Param('appointmentId') appointmentId: string) {
    return this.scoreService.findByAppointment(appointmentId);
  }
}
