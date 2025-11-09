import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Score } from '../models/scoring.model';
import { Appointment } from '../models/appointment.entity';
import { ServicePoints } from '../models/servicePoints.entity';
import { ScoresCreateDTO } from '../interfaces/Scores';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(ServicePoints)
    private servicePointsRepository: Repository<ServicePoints>,
  ) {}

  async create(data: ScoresCreateDTO[]) {
    data.forEach((scr) => {
      if (!scr.appointmentId) {
        throw new BadRequestException('Appointment ID is required');
      }
      if (!scr.value) {
        throw new BadRequestException('Score value is required');
      }

      if (scr.value < 1 || scr.value > 10) {
        throw new BadRequestException('Score value must be between 1 and 10');
      }
    });
    const scores = this.scoreRepository.create(data);
    const availablePoints = await this.servicePointsRepository.find();
    let hasAllPoints = true;
    availablePoints.forEach((point) => {
      const score = scores.find((s) => s.servicePointId === point.id);
      if (!score) {
        hasAllPoints = false;
      }
    });

    if (!hasAllPoints) {
      throw new BadRequestException('All service points must be scored');
    }

    return await this.scoreRepository.save(scores);
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
  async getAllServicePoints(): Promise<ServicePoints[]> {
    return this.servicePointsRepository.find();
  }
}
