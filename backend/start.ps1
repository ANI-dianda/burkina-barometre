# Script de démarrage rapide pour le backend
Write-Host "🚀 Démarrage du backend Baromètre des Services Publics" -ForegroundColor Green

# Vérifier si .env existe
if (-not (Test-Path ".env")) {
    Write-Host "📋 Copie du fichier .env.example vers .env" -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Pensez à modifier le fichier .env avec vos configurations" -ForegroundColor Yellow
}

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Blue
npm ci

# Générer le client Prisma
Write-Host "🔧 Génération du client Prisma..." -ForegroundColor Blue
npx prisma generate

# Appliquer les migrations
Write-Host "🗄️  Application des migrations..." -ForegroundColor Blue
npx prisma migrate deploy

# Peupler la base de données
Write-Host "🌱 Peuplement de la base de données..." -ForegroundColor Blue
npm run db:seed

# Démarrer le serveur
Write-Host "🎯 Démarrage du serveur de développement..." -ForegroundColor Green
Write-Host "📍 API disponible sur: http://localhost:3000/api/v1" -ForegroundColor Cyan
Write-Host "🏥 Health check: http://localhost:3000/api/v1/health" -ForegroundColor Cyan
Write-Host "" 
npm run start:dev