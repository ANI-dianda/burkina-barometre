import { Test, TestingModule } from '@nestjs/testing';
import { AvisService } from './avis.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AvisService', () => {
  let service: AvisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvisService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<AvisService>(AvisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
