import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Repository } from 'typeorm';
import { Appointment } from '../models/appointment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentMockRepository: Partial<
    Record<keyof Repository<Appointment>, jest.Mock>
  >;
  beforeEach(async () => {
    appointmentMockRepository = {
      find: jest.fn().mockResolvedValue([
        {
          id: crypto.randomUUID(),
          date: new Date(),
          description: 'Test Appointment',
          matricula: 'ABC123',
          clientId: crypto.randomUUID(),
          createdAt: new Date(),
          scores: [],
        },
      ]),
      findOne: jest.fn().mockResolvedValue({
        id: crypto.randomUUID(),
        date: new Date(),
        description: 'Test Appointment',
        matricula: 'ABC123',
        clientId: crypto.randomUUID(),
        createdAt: new Date(),
        scores: [],
      }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      save: jest.fn().mockImplementation((dto) => ({
        id: crypto.randomUUID(),
        createdAt: new Date(),
        scores: [],
        ...dto,
      })),
      // Override save implementation dynamically in creation test to echo provided dto
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      create: jest.fn().mockImplementation((dto) => dto),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: appointmentMockRepository,
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('Find All Appointments', () => {
    expect(service).toBeDefined();
  });
  it('Find Appointment by Client ID', async () => {
    const clientId = crypto.randomUUID();
    const appointments = await service.findByClient(clientId);
    expect(appointments).toBeDefined();
    expect(appointments.length).toBeGreaterThan(0);
  });

  it('Find Appointment of Client Without Client ID', async () => {
    await expect(service.findByClient('')).rejects.toThrow(BadRequestException);
  });
  it('Create Appointment', async () => {
    const appointmentData = {
      matricula: 'XYZ789',
      clientId: crypto.randomUUID(),
      date: new Date('2026-12-31T10:00:00Z'),
    };
    appointmentMockRepository.findOne?.mockResolvedValue(null);
    const appointment = await service.create(appointmentData);
    expect(appointment).toBeDefined();
    expect(appointment.matricula).toBe(appointmentData.matricula);
  });

  it('Create Appointment without Matricula', () => {
    const incomplete: any = { date: new Date(), clientId: crypto.randomUUID() };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void expect(service.create(incomplete)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('Create Appointment without Date', () => {
    const incomplete: any = {
      matricula: 'XYZ789',
      clientId: crypto.randomUUID(),
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void expect(service.create(incomplete)).rejects.toThrow(
      BadRequestException,
    );
  });
});
