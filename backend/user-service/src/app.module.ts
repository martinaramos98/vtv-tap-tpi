import { Module } from '@nestjs/common';
import { Role } from './models/role.entity';
import { User } from './models/user.entity';
import { Credential } from './models/credential.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o la URL de tu contenedor/servicio en la nube
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'user_service',
      entities: [User, Role, Credential],
      synchronize: process.env.ENV === 'development', // ⚠️ Solo para desarrollo
    }),
    UserModule,
  ],
})
export class AppModule {}
