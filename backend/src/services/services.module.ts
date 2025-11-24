import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from '../prisma/prisma.service'; // On importe notre connexion

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService], // <-- AJOUTER PrismaService ICI
})
export class ServicesModule {}
