import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SearchServicesDto } from './dto/search-services.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.servicePublic.create({
      data: createServiceDto,
    });
  }

  findAll(searchDto?: SearchServicesDto) {
    const where: any = {};
    const orderBy: any = {};

    if (searchDto?.name) {
      where.name = { contains: searchDto.name, mode: 'insensitive' };
    }
    if (searchDto?.type) {
      where.type = { contains: searchDto.type, mode: 'insensitive' };
    }
    if (searchDto?.administrationId) {
      where.administrationId = searchDto.administrationId;
    }

    if (searchDto?.sortBy) {
      orderBy[searchDto.sortBy] = searchDto.order || 'asc';
    } else {
      orderBy.currentScore = 'desc';
    }

    return this.prisma.servicePublic.findMany({
      where,
      orderBy,
      include: {
        administration: true,
        _count: {
          select: { avis: true },
        },
      },
    });
  }

  async findNearby(lat: number, lng: number, radiusInKm: number = 5) {
    // Recherche géospatiale simple avec calcul de distance
    const services = await this.prisma.servicePublic.findMany({
      where: {
        AND: [
          { latitude: { not: null } },
          { longitude: { not: null } },
        ],
      },
      include: {
        administration: true,
        _count: {
          select: { avis: true },
        },
      },
    });

    // Calcul de la distance et filtrage
    const servicesWithDistance = services
      .map(service => {
        const distance = this.calculateDistance(
          lat, lng,
          service.latitude!, service.longitude!
        );
        return { ...service, distance };
      })
      .filter(service => service.distance <= radiusInKm)
      .sort((a, b) => a.distance - b.distance);

    return servicesWithDistance;
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  findOne(id: string) {
    return this.prisma.servicePublic.findUnique({
      where: { id },
      include: {
        avis: true, // <-- C'est la seule chose à ajouter !
      },
    });
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.prisma.servicePublic.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  remove(id: string) {
    return this.prisma.servicePublic.delete({
      where: { id },
    });
  }
}
