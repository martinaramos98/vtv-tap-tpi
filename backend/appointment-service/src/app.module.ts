import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './models/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Score } from './models/score.entity';

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
        entities: [Appointment, Score],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    AppointmentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Aplica a todas las rutas
  }
}
