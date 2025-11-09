import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './controllers/scoring.controller';
import { Score } from './models/scoring.model';
import { ScoreService } from './services/scoring.service';
import { Appointment } from './models/appointment.entity';
import { ServicePoints } from './models/servicePoints.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Appointment, ServicePoints])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoringModule {}
