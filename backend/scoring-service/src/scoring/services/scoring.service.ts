import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../models/scoring.model';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  create(data: Partial<Score>) {
    const score = this.scoreRepository.create(data);
    return this.scoreRepository.save(score);
  }

  findAll() {
    return this.scoreRepository.find();
  }

  findByAppointment(appointmentId: string) {
    return this.scoreRepository.find({ where: { appointmentId } });
  }
}
