<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

---

## Development quickstart (project-specific)

The following steps help you run the backend locally and with Docker.

### Local (fast)

1. Install deps

```powershell
npm ci
```

2. Copy the example env and edit if needed

```powershell
copy .env.example .env
# then edit .env
```

Note: The `.env.example` contains development defaults. You must set a strong `JWT_SECRET` and a secure `DATABASE_URL` for staging/production. Avoid committing the real `.env` file.

3. Start dev server (hot reload)

```powershell
npm run start:dev
```

Open http://localhost:3000

### Docker (dev)

The repository contains `docker-compose.yml` with three helper services:

- `postgres-db` — PostgreSQL + PostGIS
- `app-dev` — development container (mounts your source, runs `npm run start:dev`)
- `prisma-init` — one-shot helper to run `prisma generate` and `prisma migrate deploy` inside the same compose network

Typical workflow to start everything via Docker:

```powershell
# start postgres
docker-compose -f .\docker-compose.yml up -d postgres-db

# run prisma migrations inside compose (one-shot)
docker-compose -f .\docker-compose.yml run --rm prisma-init

# start dev container (hot reload)
docker-compose -f .\docker-compose.yml up --build app-dev
```

If you prefer a production image, build and start the `app` service instead:

```powershell
docker-compose -f .\docker-compose.yml up --build app
```

Note: both `app` and `app-dev` map port 3000 — do not run them simultaneously.

### Prisma / DB

- Schema: `prisma/schema.prisma`
- Local generate/migrate (host):

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

### DBeaver connection

- Host: `localhost`
- Port: `5432`
- Database: `barometre`
- User: `user`
- Password: `password`

### Postman

A Postman collection is included: `postman_collection.json`.

### Postman environment (included)

You can import `postman_environment.json` to quickly create an environment that contains `baseUrl` and `token` variables. After running `POST /auth/login`, the collection's tests will save the `accessToken` into the `token` variable automatically (see the Login request tests).

## DBeaver: guide rapide

1. Open DBeaver and create a new connection (Database -> New Database Connection -> PostgreSQL).
2. Use the following connection details (when using the docker-compose `postgres-db`):

  - Host: localhost
  - Port: 5432
  - Database: barometre
  - User: user
  - Password: password

3. Test the connection, then Finish. Expand the database to view schemas and tables created by Prisma.

Notes:
- If Postgres runs in Docker, ensure the container is up (`docker ps`) and port 5432 is mapped.
- If you use a remote DB, adjust the `DATABASE_URL` in your `.env` accordingly.

Import it and create an environment with `baseUrl` = `http://localhost:3000` and a `token` variable for auth.

### Troubleshooting

- Docker image pull fails: check Docker Desktop network/proxy settings; ensure you can pull `node:20-alpine`.
- Prisma EPERM on Windows: stop node processes or reboot, then run `npx prisma generate` again.

---

## 🆕 Nouvelles fonctionnalités ajoutées

### Modules complets
- ✅ **Administration** - Gestion des ministères et administrations
- ✅ **Services** - CRUD + recherche géospatiale + filtres
- ✅ **Avis** - Système de notation avec calcul automatique des scores
- ✅ **Réponses Admin** - Les admins peuvent répondre aux avis
- ✅ **Statistiques** - Tableau de bord et analytics
- ✅ **Authentification** - OTP amélioré avec validation

### Endpoints disponibles
- 🔍 **Recherche géospatiale** : `/api/v1/services/nearby?lat=X&lng=Y`
- 📊 **Statistiques** : `/api/v1/stats/dashboard`
- 🏆 **Top services** : `/api/v1/stats/services/top-rated`
- 🔐 **Authentification** : `/api/v1/auth/register` et `/api/v1/auth/login`

### Scripts utiles
```powershell
# Démarrage rapide (Windows)
.\start.ps1

# Ou manuellement
npm ci
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run start:dev
```

### Base de données
- 🌱 **Seed automatique** avec données de test
- 🗺️ **Support PostGIS** pour la géolocalisation
- 📈 **Calcul automatique** des scores moyens

### Documentation
- 📚 **API_ENDPOINTS.md** - Documentation complète des endpoints
- 🔧 **Configuration** améliorée avec .env.example détaillé

## 🚀 Démarrage rapide

### Option 1: Script automatique
```powershell
.\start.ps1  # Windows
# ou
./start.sh   # Linux/Mac
```

### Option 2: Manuel
```powershell
npm ci
copy .env.example .env
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run start:dev
```

### Option 3: Docker
```powershell
docker-compose up -d postgres-db
docker-compose run --rm prisma-init
docker-compose up --build app-dev
```

## 📋 TODO restant (optionnel)

1. **SMS réel** - Intégrer un service SMS pour les OTP
2. **Redis** - Cache pour les OTP en production
3. **Upload d'images** - Photos des services
4. **Notifications** - Push notifications
5. **Rate limiting** - Protection contre le spam
6. **Tests e2e** - Tests d'intégration complets

Le projet est maintenant **fonctionnel et prêt pour le développement** ! 🎉
