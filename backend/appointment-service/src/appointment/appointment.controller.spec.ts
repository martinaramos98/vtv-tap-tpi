import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from '../models/appointment.entity';
import { Repository } from 'typeorm';

describe('AppointmentController', () => {
  let controller: AppointmentController;

  beforeEach(async () => {
    const appointmentMockRepository: Partial<
      Record<keyof Repository<Appointment>, jest.Mock>
    > = {
      findOne: jest.fn().mockResolvedValue(null),
      find: jest.fn().mockResolvedValue([]),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      save: jest.fn().mockImplementation((dto) => ({ id: '1', ...dto })),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      create: jest.fn().mockImplementation((dto) => dto),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: appointmentMockRepository,
        },
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
