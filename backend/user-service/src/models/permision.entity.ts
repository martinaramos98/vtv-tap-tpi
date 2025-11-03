// src/user/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'text' })
  name: string; // ejemplo: 'CREATE_APPOINTMENT', 'DELETE_USER'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
