import { IsString, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsString()
  type: string;

  @IsString()
  subject_id: string;

  @IsString()
  base64: string;
}
