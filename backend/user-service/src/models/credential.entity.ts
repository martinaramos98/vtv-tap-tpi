// src/user/entities/credential.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('credentials')
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  passwordHash: string;

  @OneToOne(() => User, (user) => user.credential, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
