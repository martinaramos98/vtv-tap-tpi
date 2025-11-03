import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Score } from '../models/scoring.model';
import { Appointment } from '../models/appointment.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(data: Partial<Score>) {
    const score = this.scoreRepository.create(data);
    return this.scoreRepository.save(score);
  }

  async findAll() {
    try {
      const result = await this.appointmentRepository.find({
        where: {
          scores: { id: IsNull() },
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
  async findAllCompleted() {
    try {
      const result = await this.appointmentRepository.find({
        where: {
          scores: { id: Not(IsNull()) },
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findByAppointment(appointmentId: string) {
    return this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['scores'],
    });
  }
}
