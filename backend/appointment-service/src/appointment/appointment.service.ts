import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/models/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async create(data: { matricula: string; clientId: string; date: Date }) {
    // TODO:  validar rol del usuario en el user-service

    try {
      const existing: Appointment | null = await this.appointmentRepo.findOne({
        where: { matricula: data.matricula, date: data.date },
      });
      if (existing)
        throw new BadRequestException(
          'El turno ya está reservado para esa fecha',
        );
    } catch (error) {
      console.error('Error checking existing appointment:', error);
      throw new BadRequestException('Error al verificar disponibilidad');
    }
    const appointment = this.appointmentRepo.create(data);
    return await this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return await this.appointmentRepo.find();
  }

  async findByClient(clientId: string) {
    return await this.appointmentRepo.find({
      where: { clientId },
      relations: ['scores'],
    });
  }

  async findByMatricula(matricula: string, clientId: string) {
    return await this.appointmentRepo.find({
      where: { matricula, clientId },
      relations: ['scores'],
    });
  }
}
