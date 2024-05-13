import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { UserEntity } from 'src/user/user.entity';
import { AuthDTO } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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

  async findByUsername(email: string) {
    return await this.userRepository.findBy({
      email: Like(email),
    });
  }

  async changeInfo(authDTO: AuthDTO.ChageInfo) {}
}
