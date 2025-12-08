#!/usr/bin/env pwsh

Write-Host "Demarrage du projet Burkina Barometre (Backend)" -ForegroundColor Green

# Verifier si Node.js est installe
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js n'est pas installe. Veuillez l'installer depuis https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verifier si npm est installe
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm n'est pas installe." -ForegroundColor Red
    exit 1
}

Write-Host "Installation des dependances..." -ForegroundColor Yellow
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors de l'installation des dependances" -ForegroundColor Red
    exit 1
}

# Copier .env.example vers .env si .env n'existe pas
if (-not (Test-Path ".env")) {
    Write-Host "Copie du fichier .env.example vers .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Fichier .env cree. Vous pouvez le modifier si necessaire." -ForegroundColor Green
}

Write-Host "Generation des types Prisma..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors de la generation Prisma" -ForegroundColor Red
    exit 1
}

Write-Host "Application des migrations de base de donnees..." -ForegroundColor Yellow
npx prisma migrate deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors des migrations" -ForegroundColor Red
    exit 1
}

Write-Host "Insertion des donnees de test..." -ForegroundColor Yellow
npm run db:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors du seed (peut-etre deja fait)" -ForegroundColor Yellow
}

Write-Host "Demarrage du serveur de developpement..." -ForegroundColor Green
Write-Host "L'API sera disponible sur http://localhost:3000" -ForegroundColor Cyan
Write-Host "Documentation Swagger: http://localhost:3000/api" -ForegroundColor Cyan

npm run start:dev