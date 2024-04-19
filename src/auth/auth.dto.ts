import { IsString, Length } from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export namespace AuthDTO {
  export class SignUp {
    @IsString()
    username: string;

    @IsString()
    @Length(4, 20)
    password: string;
  }

  export class SignIn {
    @IsString()
    username: string;

    @IsString()
    @Length(4, 20)
    password: string;
  }

  export class ChageInfo {
    @IsString()
    @Length(4, 20)
    password: string;

    @IsString()
    @Length(4, 20)
    newPassword: string;
  }
}
