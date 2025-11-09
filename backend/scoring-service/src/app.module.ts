import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Score } from './scoring/models/scoring.model';
import { Appointment } from './scoring/models/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringModule } from './scoring/scoring.module';
import { AuthMiddleware } from 'middlewares/auth.middleware';
import { ServicePoints } from './scoring/models/servicePoints.entity';

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
        entities: [Score, Appointment, ServicePoints],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    ScoringModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Aplica a todas las rutas
  }
}
