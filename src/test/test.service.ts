import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestEntity } from './test.entity';
import { QuestionEntity } from 'src/question/question.entity';
import { TestDTO } from './test.dto';
import { TestResultEntity } from 'src/testResult/test-result.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private testsRepository: Repository<TestEntity>,
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
    @InjectRepository(TestResultEntity)
    private testResultsRepository: Repository<TestResultEntity>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.testsRepository.find({
      relations: ['results'],
    });
  }

  async create(test: TestDTO.CreateTestDto): Promise<TestEntity> {
    const maxValue = await this.testsRepository
      .createQueryBuilder('test')
      .select('MAX(test.order_no) as value')
      .getRawOne();

    const testData = {
      ...test,
      question_count: test.questions.length,
      order_no: maxValue.value !== null ? maxValue.value + 1 : 0,
    };

    return await this.testsRepository.save(testData);
  }

  async findOne(id: number): Promise<any> {
    return await this.testsRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async updateTest(id: number, test: TestDTO.CreateTestDto): Promise<any> {
    const testData = await this.testsRepository.findOne({
      where: { id },
    });

    if (!testData) {
      throw new NotFoundException(`Todo list with id ${id} not found`);
    }

    testData.title = test.title;
    testData.subtitle = test.subtitle;
    testData.description = test.description;
    testData.question_count = test.questions.length;

    await this.questionsRepository
      .createQueryBuilder()
      .delete()
      .from(QuestionEntity)
      .where('subject_id = :id', { id })
      .execute();

    await this.testsRepository.save(testData);
    await this.questionsRepository.save(
      test.questions.map((item) => ({ ...item, subject_id: id })),
    );

    return;
  }

  async updateActive(id: number, active: boolean): Promise<number> {
    await this.testsRepository.update(id, { active });
    return id;
  }

  async updateOrder(data: TestDTO.UpdateTestOrderDto[]): Promise<string> {
    for (const item of data) {
      await this.testsRepository.update(item.id, { order_no: item.order_no });
    }
    return 'ok';
  }
}
