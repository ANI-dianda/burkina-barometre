import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalServices,
      totalAvis,
      totalUsers,
      totalAdministrations,
      averageScore,
      recentAvis,
    ] = await Promise.all([
      this.prisma.servicePublic.count(),
      this.prisma.avis.count(),
      this.prisma.user.count(),
      this.prisma.administration.count(),
      this.prisma.servicePublic.aggregate({
        _avg: { currentScore: true },
      }),
      this.prisma.avis.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          service: { select: { name: true } },
          user: { select: { id: true, role: true } },
        },
      }),
    ]);

    return {
      totalServices,
      totalAvis,
      totalUsers,
      totalAdministrations,
      averageScore: averageScore._avg.currentScore || 0,
      recentAvis,
    };
  }

  async getTopRatedServices(limit: number = 10) {
    return this.prisma.servicePublic.findMany({
      take: limit,
      orderBy: { currentScore: 'desc' },
      where: { currentScore: { gt: 0 } },
      include: {
        administration: { select: { name: true } },
        _count: { select: { avis: true } },
      },
    });
  }

  async getMostReviewedServices(limit: number = 10) {
    const services = await this.prisma.servicePublic.findMany({
      include: {
        administration: { select: { name: true } },
        _count: { select: { avis: true } },
      },
      orderBy: {
        avis: { _count: 'desc' },
      },
      take: limit,
    });

    return services.filter((service) => service._count.avis > 0);
  }

  async getAdministrationPerformance() {
    const administrations = await this.prisma.administration.findMany({
      include: {
        services: {
          include: {
            _count: { select: { avis: true } },
          },
        },
      },
    });

    return administrations.map((admin) => {
      const totalServices = admin.services.length;
      const totalAvis = admin.services.reduce(
        (sum, service) => sum + service._count.avis,
        0,
      );
      const averageScore =
        admin.services.length > 0
          ? admin.services.reduce(
              (sum, service) => sum + service.currentScore,
              0,
            ) / admin.services.length
          : 0;

      return {
        id: admin.id,
        name: admin.name,
        ministry: admin.ministry,
        totalServices,
        totalAvis,
        averageScore: Math.round(averageScore * 100) / 100,
      };
    });
  }
}
