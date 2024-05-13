import { IsString } from 'class-validator';
import { Role } from 'src/auth/auth.dto';

export namespace UserDTO {
  export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nickname: string;
  }
}
