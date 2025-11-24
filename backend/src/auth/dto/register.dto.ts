import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 15) // Accepte des numéros de téléphone de 8 à 15 chiffres
  phoneNumber: string;
}
