// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './app.service';

import { JwtModule } from '@nestjs/jwt';
import { UserController } from './app.controller';
import { User } from './models/user.entity';
import { Role } from './models/role.entity';
import { Credential } from './models/credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Credential]),
    JwtModule.register({
      secret: 'secret-key', // ⚠️ Usar variable de entorno
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
