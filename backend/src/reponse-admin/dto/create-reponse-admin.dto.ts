import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReponseAdminDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  avisId: string;
}
