import { Injectable } from '@nestjs/common';
import { CreateAvisDto } from './dto/create-avis.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAvisDto } from './dto/update-avis.dto';

@Injectable()
export class AvisService {
  constructor(private prisma: PrismaService) {}

  async create(createAvisDto: CreateAvisDto, userId: string) {
    // Utilisation d'une transaction pour garantir l'atomicité
    const newAvis = await this.prisma.$transaction(async (tx) => {
      // Étape 1 : Créer le nouvel avis en utilisant la syntaxe 'connect' pour les relations
      const avis = await tx.avis.create({
        data: {
          // Champs directs de l'avis
          ratingAccueil: createAvisDto.ratingAccueil,
          ratingDelai: createAvisDto.ratingDelai,
          ratingResolution: createAvisDto.ratingResolution,
          comment: createAvisDto.comment,
          // Connexion à la relation ServicePublic
          service: {
            connect: { id: createAvisDto.serviceId },
          },
          // Connexion à la relation User
          user: {
            connect: { id: userId }, // <-- LA CORRECTION EST ICI !
          },
        },
      });

      // Étape 2 : Récupérer tous les avis (uniquement les notes) pour ce service
      const allAvisForService = await tx.avis.findMany({
        where: { serviceId: createAvisDto.serviceId },
        select: {
          ratingAccueil: true,
          ratingDelai: true,
          ratingResolution: true,
        },
      });

      // Étape 3 : Calculer la nouvelle note moyenne
      let averageScore = 0;
      if (allAvisForService.length > 0) {
        const totalRatings = allAvisForService.reduce((acc, current) => {
          return (
            acc +
            (current.ratingAccueil || 0) +
            (current.ratingDelai || 0) +
            (current.ratingResolution || 0)
          );
        }, 0);
        // On divise par le nombre d'avis * 3 (car 3 notes par avis)
        averageScore = totalRatings / (allAvisForService.length * 3);
      }

      // Étape 4 : Mettre à jour le ServicePublic avec le nouveau score
      await tx.servicePublic.update({
        where: { id: createAvisDto.serviceId },
        data: { currentScore: averageScore },
      });

      // Retourner l'avis nouvellement créé depuis la transaction
      return avis;
    });

    return newAvis;
  }

  // --- Autres méthodes (on peut mettre des versions simples pour l'instant) ---
  findAll() {
    return this.prisma.avis.findMany();
  }

  findOne(id: string) {
    return this.prisma.avis.findUnique({ where: { id } });
  }

  update(id: string, updateAvisDto: UpdateAvisDto) {
    return this.prisma.avis.update({ where: { id }, data: updateAvisDto });
  }

  remove(id: string) {
    return this.prisma.avis.delete({ where: { id } });
  }
}
