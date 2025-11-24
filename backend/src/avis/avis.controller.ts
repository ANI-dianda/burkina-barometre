import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAvisDto } from './dto/create-avis.dto';
import { UpdateAvisDto } from './dto/update-avis.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import type { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser() user: User | undefined,
    @Body() createAvisDto: CreateAvisDto,
  ) {
    // Ensure the request is authenticated
    if (!user || !user.id) {
      throw new UnauthorizedException(
        'Authentication required to create an avis',
      );
    }

    // Validate required fields
    if (!createAvisDto || !createAvisDto.serviceId) {
      throw new BadRequestException('serviceId is required');
    }

    return this.avisService.create(createAvisDto, user.id);
  }

  @Get()
  findAll() {
    return this.avisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvisDto: UpdateAvisDto) {
    return this.avisService.update(id, updateAvisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avisService.remove(id);
  }
}
