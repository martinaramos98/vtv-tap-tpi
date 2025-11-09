import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../models/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async create(data: { matricula: string; clientId: string; date: Date }) {
    if (!data.matricula || !data.clientId || !data.date) {
      throw new BadRequestException('Datos incompletos para crear la reserva');
    }
    const existing: Appointment | null = await this.appointmentRepo.findOne({
      where: { matricula: data.matricula, date: data.date },
    });
    if (existing)
      throw new BadRequestException(
        'El turno ya está reservado para esa fecha',
      );
    const appointment = this.appointmentRepo.create(data);
    if (!appointment) {
      throw new InternalServerErrorException('Error al crear la reserva');
    }
    return await this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return await this.appointmentRepo.find();
  }

  async findByClient(clientId: string) {
    if (!clientId) {
      throw new BadRequestException('ClientId es requerido');
    }
    const result = await this.appointmentRepo.find({
      where: { clientId },
      relations: {
        scores: {
          servicePoint: true,
        },
      },
    });
    return result.map((appointment) => ({
      id: appointment.id,
      matricula: appointment.matricula,
      date: appointment.date,
      scores: appointment.scores.map((scores) => ({
        id: scores.id,
        value: scores.value,
        description: scores.servicePoint.description,
        name: scores.servicePoint.name,
      })),
    }));
  }

  async findByMatricula(matricula: string, clientId: string) {
    return await this.appointmentRepo.find({
      where: { matricula, clientId },
      relations: ['scores'],
    });
  }
}
