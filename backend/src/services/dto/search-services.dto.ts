import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchServicesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsUUID()
  administrationId?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'currentScore' | 'createdAt';

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}