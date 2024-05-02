import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestEntity } from './test.entity';
import { QuestionEntity } from 'src/question/question.entity';
import { TestResultEntity } from 'src/testResult/test-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity]),
    TypeOrmModule.forFeature([TestResultEntity]),
    TypeOrmModule.forFeature([QuestionEntity]),
  ],
  controllers: [TestController],
  providers: [TestService, JwtService],
})
export class TestModule {}
