import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';

import { AdminService } from './admin.service';
import { AuthDTO } from 'src/auth/auth.dto';
import { IAdmin } from './interface';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<IAdmin[]> {
    return this.adminService.findAll();
  }

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { username } = authDTO;

    const hasUsername = await this.adminService.findByUsername(username);
    if (!!hasUsername) {
      throw new ConflictException('이미 존재하는 아이디 입니다.');
    }
    await this.adminService.create(authDTO);

    return '회원가입성공';
  }

  @Post('/login')
  async signin(@Body() authDTO: AuthDTO.SignUp) {
    await this.adminService.create(authDTO);

    return 'success';
  }
}
