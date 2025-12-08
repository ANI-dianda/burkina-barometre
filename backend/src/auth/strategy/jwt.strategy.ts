import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  // Cette méthode est appelée AUTOMATIQUEMENT après que le token a été validé.
  // Elle reçoit le contenu du token (le "payload").
  async validate(payload: { sub: string; role: string }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // REMPLACEZ CECI :
    // delete user.phoneNumberHash;
    // return user;

    // PAR CECI :
    // Remove phoneNumberHash from the returned user object. We copy then
    // delete to avoid leaving the hash on the object returned to handlers.
    // Silence unsafe-assignment/member-access for this narrow runtime cast.
    // Silence unsafe-assignment for the copy.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tmp = { ...(user as any) };
    // Silence unsafe-member-access for this deliberate deletion.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete tmp.phoneNumberHash;
    return tmp as User;
  }
}
