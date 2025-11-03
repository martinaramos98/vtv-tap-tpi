import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  value: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Foreign key (appointmentId) que referencia a otro servicio
  @Column({ type: 'uuid' })
  appointmentId: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.scores, {
    onDelete: 'CASCADE',
  })
  appointment: Appointment;
}
