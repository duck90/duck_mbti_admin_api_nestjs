import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminEntity } from 'src/admin/admin.entity';
import { AuthDTO } from '../auth/auth.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.adminRepository.create(authDTO);
    return await this.adminRepository.save(userEntity);
  }

  async findAll() {
    const users = await this.adminRepository.find();

    return users.map((item) => {
      delete item.password;

      return item;
    });
  }

  async findById(id: number) {
    return await this.adminRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.adminRepository.findOne({
      where: {
        username,
      },
    });
  }

  async changeInfo(authDTO: AuthDTO.ChageInfo) {}
}
