import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdministrationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  ministry?: string;
}
