import { IsString } from 'class-validator';
import { Role } from 'src/auth/auth.dto';

export namespace UserDTO {
  export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    role?: Role;
  }
}
