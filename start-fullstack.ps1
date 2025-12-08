# Script de démarrage complet
Write-Host "🚀 Démarrage de l'application complète..." -ForegroundColor Green

# Démarrer la base de données
Write-Host "📊 Démarrage de PostgreSQL..." -ForegroundColor Yellow
docker-compose -f docker-compose.fullstack.yml up -d postgres

# Attendre que la DB soit prête
Write-Host "⏳ Attente de la base de données..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Démarrer le backend
Write-Host "🔧 Démarrage du backend..." -ForegroundColor Yellow
cd backend
npm ci
npx prisma generate
npx prisma migrate deploy
npm run db:seed
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run start:dev"
cd ..

# Attendre que le backend soit prêt
Start-Sleep -Seconds 5

# Démarrer le frontend
Write-Host "🎨 Démarrage du frontend..." -ForegroundColor Yellow
cd frontend
npm ci
$env:PORT = "3002"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
cd ..

Write-Host "✅ Application démarrée !" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3002" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3000/api/v1" -ForegroundColor Cyan
Write-Host "📊 Base de données: localhost:5432" -ForegroundColor Cyan