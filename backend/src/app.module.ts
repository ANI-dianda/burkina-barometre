import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { AvisModule } from './avis/avis.module';
import { ServicesModule } from './services/services.module';
import { AdministrationModule } from './administration/administration.module';
import { ReponseAdminModule } from './reponse-admin/reponse-admin.module';
import { StatsModule } from './stats/stats.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    AvisModule,
    ServicesModule,
    AdministrationModule,
    ReponseAdminModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
