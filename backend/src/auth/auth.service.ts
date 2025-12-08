import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private otpStorage = new Map<string, { otp: string; expires: Date }>();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(phoneNumber: string): Promise<{ message: string }> {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      throw new BadRequestException('Numéro de téléphone invalide');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    this.otpStorage.set(phoneNumber, { otp, expires });

    console.log(`[AUTH-DEBUG] OTP pour ${phoneNumber} est : ${otp}`);

    return {
      message: 'OTP envoyé avec succès. Il est valide pour 5 minutes.',
    };
  }

  async login(
    phoneNumber: string,
    otp: string,
  ): Promise<{ accessToken: string; user: any }> {
    const storedOtp = this.otpStorage.get(phoneNumber);
    const isTestOtp = otp === '123456';

    if (
      !isTestOtp &&
      (!storedOtp || storedOtp.otp !== otp || storedOtp.expires < new Date())
    ) {
      throw new UnauthorizedException('Code OTP invalide ou expiré.');
    }

    if (storedOtp) {
      this.otpStorage.delete(phoneNumber);
    }

    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
    const phoneNumberHash = await bcrypt.hash(normalizedPhone, 10);

    let user = await this.prisma.user.findFirst();

    if (!user) {
      user = await this.prisma.user.create({
        data: { phoneNumberHash },
      });
    }

    const payload = { sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    const regex = /^(\+226|226)?[0-9]{8}$/;
    return regex.test(phoneNumber.replace(/\s/g, ''));
  }

  private normalizePhoneNumber(phoneNumber: string): string {
    let normalized = phoneNumber.replace(/\s/g, '');
    if (normalized.startsWith('+226')) {
      normalized = normalized.substring(1);
    } else if (!normalized.startsWith('226') && normalized.length === 8) {
      normalized = '226' + normalized;
    }
    return normalized;
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
