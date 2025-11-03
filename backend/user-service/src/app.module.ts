import { Module } from '@nestjs/common';
import { Role } from './models/role.entity';
import { User } from './models/user.entity';
import { Credential } from './models/credential.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User.module';
import { Permission } from './models/permision.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que ConfigService esté disponible en toda la app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '5432')),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
        database: configService.get<string>('DATABASE_NAME', 'main_db'),
        entities: [User, Role, Credential, Permission],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
