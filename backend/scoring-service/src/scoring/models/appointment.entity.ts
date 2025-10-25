// src/scoring/entities/appointment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Score } from './scoring.model';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  matricula: string; // dato clave (por ejemplo, matrícula profesional o vehículo)

  @Column()
  clientId: string; // id del usuario que reserva (referencia a user-service)

  @Column()
  date: Date; // fecha y hora del turno

  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Score, (score) => score.appointment)
  scores: Score[];
}
