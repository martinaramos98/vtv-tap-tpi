import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { ServicePoints } from './servicePoints.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  value: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'uuid', nullable: false })
  appointmentId: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.scores, {
    onDelete: 'CASCADE',
  })
  appointment: Appointment;

  @Column({ type: 'uuid', nullable: false })
  servicePointId: string;

  @ManyToOne(() => ServicePoints, (point) => point.scores)
  servicePoint: ServicePoints;
}
