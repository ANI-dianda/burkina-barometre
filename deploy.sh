#!/bin/bash

echo "🚀 Déploiement de l'application Baromètre des Services Publics"

# Variables d'environnement
export DB_USER=${DB_USER:-user}
export DB_PASSWORD=${DB_PASSWORD:-password}
export JWT_SECRET=${JWT_SECRET:-$(openssl rand -base64 32)}

echo "📦 Construction des images Docker..."
docker-compose -f docker-compose.prod.yml build

echo "🗄️ Démarrage de la base de données..."
docker-compose -f docker-compose.prod.yml up -d postgres

echo "⏳ Attente de la base de données..."
sleep 10

echo "🔧 Application des migrations..."
docker-compose -f docker-compose.prod.yml run --rm backend npx prisma migrate deploy

echo "🌱 Peuplement de la base de données..."
docker-compose -f docker-compose.prod.yml run --rm backend npm run db:seed

echo "🚀 Démarrage de l'application..."
docker-compose -f docker-compose.prod.yml up -d

echo "✅ Déploiement terminé !"
echo "🌐 Frontend: http://localhost"
echo "🔗 Backend API: http://localhost:3000/api/v1"
echo "🏥 Health check: http://localhost:3000/api/v1/health"