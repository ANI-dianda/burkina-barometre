import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdministrationDto } from './dto/create-administration.dto';
import { UpdateAdministrationDto } from './dto/update-administration.dto';

@Injectable()
export class AdministrationService {
  constructor(private prisma: PrismaService) {}

  create(createAdministrationDto: CreateAdministrationDto) {
    return this.prisma.administration.create({
      data: createAdministrationDto,
    });
  }

  findAll() {
    return this.prisma.administration.findMany({
      include: {
        services: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.administration.findUnique({
      where: { id },
      include: {
        services: {
          include: {
            avis: true,
          },
        },
      },
    });
  }

  update(id: string, updateAdministrationDto: UpdateAdministrationDto) {
    return this.prisma.administration.update({
      where: { id },
      data: updateAdministrationDto,
    });
  }

  remove(id: string) {
    return this.prisma.administration.delete({
      where: { id },
    });
  }
}