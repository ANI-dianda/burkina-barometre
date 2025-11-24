import { Test, TestingModule } from '@nestjs/testing';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AvisController', () => {
  let controller: AvisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvisController],
      providers: [AvisService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<AvisController>(AvisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
