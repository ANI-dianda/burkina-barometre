import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReponseAdminDto } from './dto/create-reponse-admin.dto';

@Injectable()
export class ReponseAdminService {
  constructor(private prisma: PrismaService) {}

  async create(createReponseAdminDto: CreateReponseAdminDto, adminId: string) {
    // Vérifier que l'utilisateur est admin ou modérateur
    const admin = await this.prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'MODERATOR')) {
      throw new ForbiddenException(
        'Seuls les admins peuvent répondre aux avis',
      );
    }

    return this.prisma.reponseAdmin.create({
      data: {
        content: createReponseAdminDto.content,
        avis: { connect: { id: createReponseAdminDto.avisId } },
        admin: { connect: { id: adminId } },
      },
      include: {
        avis: true,
        admin: {
          select: { id: true, role: true },
        },
      },
    });
  }

  findByAvis(avisId: string) {
    return this.prisma.reponseAdmin.findUnique({
      where: { avisId },
      include: {
        admin: {
          select: { id: true, role: true },
        },
      },
    });
  }
}
