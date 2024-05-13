import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminEntity } from 'src/admin/admin.entity';
import { AuthDTO } from '../auth/auth.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private userRepository: Repository<AdminEntity>,
  ) {}

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((item) => {
      delete item.password;

      return item;
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async changeInfo(authDTO: AuthDTO.ChageInfo) {}
}
