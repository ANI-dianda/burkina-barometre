# 🇧🇫 Baromètre des Services Publics - Burkina Faso

Application complète pour évaluer et améliorer les services publics au Burkina Faso.

## 🚀 Architecture

- **Backend** : NestJS + PostgreSQL + Prisma
- **Frontend** : React + TypeScript + Tailwind CSS
- **Déploiement** : Railway + Vercel

## 📋 Fonctionnalités

### Backend API
- ✅ Authentification JWT + OTP
- ✅ CRUD Services publics
- ✅ Système d'avis et notation
- ✅ Recherche géospatiale
- ✅ Statistiques et tableau de bord
- ✅ Gestion des administrations
- ✅ Réponses administrateurs

### Frontend Web
- ✅ Dashboard interactif
- ✅ Liste des services avec recherche
- ✅ Interface responsive
- ✅ Connexion à l'API

## 🛠️ Installation

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🌐 API Endpoints

- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion
- `GET /api/v1/services` - Liste des services
- `GET /api/v1/services/nearby` - Services à proximité
- `GET /api/v1/stats/dashboard` - Statistiques
- `GET /api/v1/administrations` - Administrations

## 🚀 Déploiement

### Railway (Backend)
1. Connectez votre repo GitHub à Railway
2. Ajoutez PostgreSQL
3. Déploiement automatique

### Vercel (Frontend)
1. Connectez votre repo à Vercel
2. Configurez `REACT_APP_API_URL`
3. Déploiement automatique

## 📱 URLs

- **API Production** : https://burkina-barometre.railway.app/api/v1
- **Frontend Production** : https://burkina-barometre.vercel.app
- **Documentation** : Voir `backend/API_ENDPOINTS.md`

## 👥 Équipe

Développé pour améliorer les services publics au Burkina Faso 🇧🇫