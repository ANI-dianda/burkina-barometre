# Script de déploiement Railway
Write-Host "🚀 Déploiement sur Railway..." -ForegroundColor Green

# Vérifier si Railway CLI est installé
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Railway CLI non trouvé. Installation..." -ForegroundColor Red
    npm install -g @railway/cli
}

# Login Railway
Write-Host "🔐 Connexion à Railway..." -ForegroundColor Yellow
railway login

# Déployer le backend
Write-Host "🔧 Déploiement du backend..." -ForegroundColor Yellow
railway up --service backend

# Déployer le frontend
Write-Host "🎨 Déploiement du frontend..." -ForegroundColor Yellow
railway up --service frontend

Write-Host "✅ Déploiement terminé !" -ForegroundColor Green