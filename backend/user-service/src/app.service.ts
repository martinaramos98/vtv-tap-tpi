import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Role } from './models/role.entity';
import { Credential } from './models/credential.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Credential) private credRepo: Repository<Credential>,
    private jwtService: JwtService,
  ) {}
  async signup(
    email: string,
    password: string,
    roleName: 'Administrator' | 'Client',
  ) {
    const existing = await this.userRepo.findOne({
      where: { username: email },
    });
    if (existing) throw new BadRequestException('Email already exists');

    let role = await this.roleRepo.findOne({ where: { name: roleName } });
    if (!role) {
      role = this.roleRepo.create({ name: roleName });
      await this.roleRepo.save(role);
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

  async signin(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['credential', 'role'],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(
      password,
      user.credential.passwordHash,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id, role: user.role.name });
    return { access_token: token };
  }
}
