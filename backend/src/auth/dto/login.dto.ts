import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6) // Un code OTP a toujours 6 chiffres
  otp: string;
}
