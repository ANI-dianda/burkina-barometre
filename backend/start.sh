#!/bin/bash

# Script de démarrage rapide pour le backend
echo "🚀 Démarrage du backend Baromètre des Services Publics"

# Vérifier si .env existe
if [ ! -f ".env" ]; then
    echo "📋 Copie du fichier .env.example vers .env"
    cp .env.example .env
    echo "⚠️  Pensez à modifier le fichier .env avec vos configurations"
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations
echo "🗄️  Application des migrations..."
npx prisma migrate deploy

# Peupler la base de données
echo "🌱 Peuplement de la base de données..."
npm run db:seed

# Démarrer le serveur
echo "🎯 Démarrage du serveur de développement..."
echo "📍 API disponible sur: http://localhost:3000/api/v1"
echo "🏥 Health check: http://localhost:3000/api/v1/health"
echo ""
npm run start:dev