import { Module } from '@nestjs/common';
import { ReponseAdminController } from './reponse-admin.controller';
import { ReponseAdminService } from './reponse-admin.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReponseAdminController],
  providers: [ReponseAdminService],
})
export class ReponseAdminModule {}