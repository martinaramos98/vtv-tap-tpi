import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './models/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middlewares/auth.middleware';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Aplica a todas las rutas
  }
}
