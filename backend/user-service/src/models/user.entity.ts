// src/user/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Role } from './role.entity';
import { Credential } from './credential.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: Date.now() })
  createdAt: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => Credential, (credential) => credential.user, {
    cascade: true,
  })
  credential: Credential;
}
