import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer des administrations
  const administrations = await Promise.all([
    prisma.administration.create({
      data: {
        name: 'Mairie de Ouagadougou',
        ministry: 'Ministère de l\'Administration Territoriale',
      },
    }),
    prisma.administration.create({
      data: {
        name: 'Direction Régionale de la Santé',
        ministry: 'Ministère de la Santé',
      },
    }),
    prisma.administration.create({
      data: {
        name: 'Direction Provinciale de l\'Éducation',
        ministry: 'Ministère de l\'Éducation Nationale',
      },
    }),
  ]);

  console.log('✅ Administrations créées');

  // Créer des services publics avec coordonnées Ouagadougou
  const services = await Promise.all([
    prisma.servicePublic.create({
      data: {
        name: 'État Civil - Secteur 1',
        type: 'État Civil',
        address: 'Avenue Kwame Nkrumah, Secteur 1',
        latitude: 12.3714,
        longitude: -1.5197,
        administrationId: administrations[0].id,
        currentScore: 3.5,
      },
    }),
    prisma.servicePublic.create({
      data: {
        name: 'Centre de Santé Urbain',
        type: 'Santé',
        address: 'Boulevard Charles de Gaulle',
        latitude: 12.3656,
        longitude: -1.5339,
        administrationId: administrations[1].id,
        currentScore: 4.2,
      },
    }),
    prisma.servicePublic.create({
      data: {
        name: 'École Primaire Publique A',
        type: 'Éducation',
        address: 'Secteur 15, Ouagadougou',
        latitude: 12.3890,
        longitude: -1.4758,
        administrationId: administrations[2].id,
        currentScore: 3.8,
      },
    }),
    prisma.servicePublic.create({
      data: {
        name: 'Commissariat de Police',
        type: 'Sécurité',
        address: 'Avenue de la Nation',
        latitude: 12.3681,
        longitude: -1.5275,
        administrationId: administrations[0].id,
        currentScore: 3.1,
      },
    }),
  ]);

  console.log('✅ Services publics créés');

  // Créer des utilisateurs de test
  const users = await Promise.all([
    prisma.user.create({
      data: {
        phoneNumberHash: 'hash_22670123456',
        role: 'CITIZEN',
      },
    }),
    prisma.user.create({
      data: {
        phoneNumberHash: 'hash_22670654321',
        role: 'ADMIN',
      },
    }),
  ]);

  console.log('✅ Utilisateurs créés');

  // Créer des avis de test
  await Promise.all([
    prisma.avis.create({
      data: {
        ratingAccueil: 4,
        ratingDelai: 3,
        ratingResolution: 4,
        comment: 'Service correct, personnel accueillant',
        status: 'APPROVED',
        userId: users[0].id,
        serviceId: services[0].id,
      },
    }),
    prisma.avis.create({
      data: {
        ratingAccueil: 5,
        ratingDelai: 4,
        ratingResolution: 5,
        comment: 'Excellent service, très professionnel',
        status: 'APPROVED',
        userId: users[0].id,
        serviceId: services[1].id,
      },
    }),
  ]);

  console.log('✅ Avis créés');
  console.log('🎉 Seeding terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });