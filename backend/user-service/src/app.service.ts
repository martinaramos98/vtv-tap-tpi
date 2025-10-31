// src/user/user.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/user.entity';
import { Role } from './models/role.entity';
import { Permission } from './models/permision.entity';
import { Credential } from './models/credential.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Credential) private credRepo: Repository<Credential>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
    private jwtService: JwtService,
  ) {}

  // ============ SIGNUP ============
  async signup(
    email: string,
    password: string,
    roleName: 'Administrator' | 'Client',
  ) {
    const existing = await this.userRepo.findOne({
      where: { username: email },
    });
    if (existing) throw new BadRequestException('Email already exists');

    const role = await this.roleRepo.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });
    if (!role) {
      throw new BadRequestException('Role not valid');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username: email,
      role,
      credential: this.credRepo.create({ passwordHash }),
    });

    await this.userRepo.save(user);
    return { message: 'User created successfully', userId: user.id };
  }

  async signin(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { username: email },
      relations: ['credential', 'role', 'role.permissions'],
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(
      password,
      user.credential.passwordHash,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id, role: user.role.name });
    return { access_token: token, expiresIn: 60 };
  }

  async assignPermissionToRole(roleName: string, permissionName: string) {
    const role = await this.roleRepo.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });
    if (!role) throw new BadRequestException('Role not found');

    let permission = await this.permRepo.findOne({
      where: { name: permissionName },
    });
    if (!permission) {
      permission = this.permRepo.create({ name: permissionName });
      await this.permRepo.save(permission);
    }

    if (!role.permissions.find((p) => p.name === permissionName)) {
      role.permissions.push(permission);
      await this.roleRepo.save(role);
    }

    return {
      message: `Permission '${permissionName}' assigned to role '${roleName}'`,
    };
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET!,
      });
      const user = await this.userRepo.findOne({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        where: { id: decoded['sub'] as string },
        relations: ['role'],
      });
      return user || null;
    } catch {
      return null;
    }
  }

  async authorize(userId: string, permissionName: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['role', 'role.permissions'],
    });
    if (!user) throw new UnauthorizedException('User not found');

    const hasPermission = user.role.permissions.some(
      (p) => p.name === permissionName,
    );
    if (!hasPermission)
      throw new ForbiddenException('User does not have permission');

    return { authorized: true };
  }
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['role'],
    });
    return user || null;
  }
}
