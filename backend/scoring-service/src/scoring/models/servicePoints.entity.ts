import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Score } from './scoring.model';

@Entity()
export class ServicePoints {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @OneToMany(() => Score, (score) => score.servicePoint)
  scores: Score[];
}
