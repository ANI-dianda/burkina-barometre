import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  // Cette route est maintenant protégée par notre serrure JWT
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user: User) {
    // Grâce à notre "videur" (JwtStrategy), nous recevons directement l'objet utilisateur
    // qui a été validé et attaché à la requête.
    return user;
  }
}
