import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ReponseAdminService } from './reponse-admin.service';
import { CreateReponseAdminDto } from './dto/create-reponse-admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('reponse-admin')
@UseGuards(JwtAuthGuard)
export class ReponseAdminController {
  constructor(private readonly reponseAdminService: ReponseAdminService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createReponseAdminDto: CreateReponseAdminDto,
  ) {
    return this.reponseAdminService.create(createReponseAdminDto, user.id);
  }

  @Get('avis/:avisId')
  findByAvis(@Param('avisId') avisId: string) {
    return this.reponseAdminService.findByAvis(avisId);
  }
}