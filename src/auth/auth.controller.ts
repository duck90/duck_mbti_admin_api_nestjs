import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthDTO } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('/admin')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { username, password } = authDTO;

    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 아이디 입니다.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
