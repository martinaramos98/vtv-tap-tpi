import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './models/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el host del contenedor
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'appointment_service',
      entities: [Appointment],
      synchronize: true, // ⚠️ solo para desarrollo
    }),
    AppointmentModule,
  ],
})
export class AppModule {}
