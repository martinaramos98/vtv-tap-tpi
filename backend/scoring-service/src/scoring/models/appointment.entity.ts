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

  @Column({ type: 'text', nullable: false })
  matricula: string; // dato clave (por ejemplo, matrícula profesional o vehículo)

  @Column({ type: 'uuid', nullable: false })
  clientId: string; // id del usuario que reserva (referencia a user-service)

  @Column({ type: 'timestamp', nullable: false })
  date: Date; // fecha y hora del turno

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @OneToMany(() => Score, (score) => score.appointment)
  scores: Score[];
}
