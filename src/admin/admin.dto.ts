import { IsString } from 'class-validator';
import { Role } from 'src/auth/auth.dto';

export namespace AdminDTO {
  export class CreateAdminDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    role?: Role;
  }
}
