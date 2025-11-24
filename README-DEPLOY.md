# 🚀 Guide de Déploiement

## Railway (Recommandé)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/NestJS)

1. Cliquez sur le bouton ci-dessus
2. Connectez votre repo GitHub
3. Railway déploiera automatiquement
4. Ajoutez PostgreSQL depuis le dashboard
5. Configurez les variables d'environnement

## Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Cliquez sur le bouton ci-dessus
2. Configurez l'app name
3. Heroku déploiera automatiquement avec PostgreSQL

## Vercel (Frontend uniquement)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Cliquez sur le bouton ci-dessus
2. Importez le dossier `frontend`
3. Configurez `REACT_APP_API_URL`

## URLs après déploiement

- **Backend API**: `https://your-app.railway.app/api/v1`
- **Frontend**: `https://your-app.vercel.app`
- **Health Check**: `https://your-app.railway.app/api/v1/health`

## Variables d'environnement requises

### Backend
- `DATABASE_URL` (auto-configuré par Railway/Heroku)
- `JWT_SECRET` (généré automatiquement)
- `NODE_ENV=production`

### Frontend
- `REACT_APP_API_URL` (URL de votre backend)

## Test après déploiement

```bash
# Test API
curl https://your-app.railway.app/api/v1/health

# Test services
curl https://your-app.railway.app/api/v1/services
```