import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async create(question: QuestionEntity): Promise<QuestionEntity> {
    const newQuestion = this.questionsRepository.create(question);
    return await this.questionsRepository.save(newQuestion);
  }

  async findAll(): Promise<QuestionEntity[]> {
    return this.questionsRepository.find();
  }

  async findOne(id: number): Promise<QuestionEntity> {
    return await this.questionsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, question: QuestionEntity): Promise<number> {
    await this.questionsRepository.update(id, question);
    return id;
  }

  async remove(id: number): Promise<number> {
    await this.questionsRepository.delete(id);
    return id;
  }
}
