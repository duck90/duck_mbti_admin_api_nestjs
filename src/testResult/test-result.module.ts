import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';
import { TestResultEntity } from './test-result.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestResultEntity]), AwsModule],
  controllers: [TestResultController],
  providers: [TestResultService],
})
export class TestResultModule {}
