# API Endpoints - Baromètre des Services Publics

Base URL: `http://localhost:3000/api/v1`

## 🔐 Authentification

### POST /auth/register
Inscription avec numéro de téléphone
```json
{
  "phoneNumber": "70123456"
}
```

### POST /auth/login  
Connexion avec OTP
```json
{
  "phoneNumber": "70123456",
  "otp": "123456"
}
```

## 👤 Profil

### GET /profile/me
Récupérer le profil utilisateur (authentifié)

## 🏛️ Administrations

### GET /administrations
Liste des administrations

### POST /administrations
Créer une administration
```json
{
  "name": "Mairie de Ouagadougou",
  "ministry": "Ministère de l'Administration Territoriale"
}
```

### GET /administrations/:id
Détails d'une administration

## 🏢 Services Publics

### GET /services
Liste des services avec filtres
- `?name=` - Recherche par nom
- `?type=` - Filtrer par type
- `?administrationId=` - Filtrer par administration
- `?sortBy=name|currentScore|createdAt`
- `?order=asc|desc`

### GET /services/nearby
Services à proximité
- `?lat=` - Latitude (requis)
- `?lng=` - Longitude (requis)  
- `?radius=` - Rayon en mètres (défaut: 5000)

### POST /services
Créer un service
```json
{
  "name": "Centre de Santé",
  "type": "Santé",
  "address": "Secteur 15",
  "administrationId": "uuid"
}
```

### GET /services/:id
Détails d'un service

## ⭐ Avis

### GET /avis
Liste des avis

### POST /avis
Créer un avis (authentifié)
```json
{
  "ratingAccueil": 4,
  "ratingDelai": 3,
  "ratingResolution": 5,
  "comment": "Bon service",
  "serviceId": "uuid"
}
```

### GET /avis/:id
Détails d'un avis

## 💬 Réponses Admin

### POST /reponse-admin
Répondre à un avis (admin/modérateur)
```json
{
  "content": "Merci pour votre retour",
  "avisId": "uuid"
}
```

### GET /reponse-admin/avis/:avisId
Récupérer la réponse d'un avis

## 📊 Statistiques

### GET /stats/dashboard
Statistiques générales du tableau de bord

### GET /stats/services/top-rated
Services les mieux notés
- `?limit=` - Nombre de résultats (défaut: 10)

### GET /stats/services/most-reviewed
Services les plus évalués
- `?limit=` - Nombre de résultats (défaut: 10)

### GET /stats/administrations/performance
Performance des administrations

## 🏥 Health Check

### GET /health
Vérification de l'état de l'API

---

## Codes de statut

- `200` - Succès
- `201` - Créé
- `400` - Requête invalide
- `401` - Non authentifié
- `403` - Accès refusé
- `404` - Non trouvé
- `500` - Erreur serveur

## Authentification

Utiliser le token JWT dans l'en-tête:
```
Authorization: Bearer <token>
```