import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from 'src/question/question.entity';
import { TestResultEntity } from 'src/testResult/test-result.entity';

@Entity({ name: 'test' })
export class TestEntity {
  @ApiProperty({ description: 'Mbti Test PK' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '부제' })
  @Column()
  subtitle: string;

  @ApiProperty({ description: '설명' })
  @Column()
  description: string;

  @ApiProperty({ description: '질문 수' })
  @Column()
  question_count: number;

  @ApiProperty({ description: '질문 정렬 순서' })
  @Column({ default: 100 })
  order_no: number;

  @ApiProperty({ description: '활성화 여부' })
  @Column({ default: false })
  active: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일시' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정일시' })
  updated_at: Date;

  @OneToMany(() => QuestionEntity, (question) => question.test, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => TestResultEntity, (result) => result.test, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  results: TestResultEntity[];
}
