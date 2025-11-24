import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateAvisDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  ratingAccueil: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  ratingDelai: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  ratingResolution: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsUUID()
  @IsNotEmpty()
  serviceId: string;
}
