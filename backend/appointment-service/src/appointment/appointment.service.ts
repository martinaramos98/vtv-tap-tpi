import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/models/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async create(data: { matricula: string; clientId: string; date: Date }) {
    // TODO:  validar rol del usuario en el user-service

    const existing = await this.appointmentRepo.findOne({
      where: { matricula: data.matricula, date: data.date },
    });
    if (existing)
      throw new BadRequestException(
        'El turno ya está reservado para esa fecha',
      );

    const appointment = this.appointmentRepo.create(data);
    return await this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return await this.appointmentRepo.find();
  }

  async findByMatricula(matricula: string) {
    return await this.appointmentRepo.find({ where: { matricula } });
  }
}
