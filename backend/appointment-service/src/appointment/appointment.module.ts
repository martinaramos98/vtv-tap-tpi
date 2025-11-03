import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from 'src/models/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Score } from 'src/models/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Score]), HttpModule],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
