import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TestEntity } from 'src/test/test.entity';

@Entity({ name: 'question' })
export class QuestionEntity {
  @ApiProperty({ description: '질문 PK' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestEntity, (test) => test.questions)
  @JoinColumn({ name: 'subject_id' })
  test: TestEntity;

  @Column()
  subject_id: number;

  @ApiProperty({ description: '질문' })
  @Column()
  question: string;

  @ApiProperty({ description: '질문 타입' })
  @Column()
  type: 'radio' | 'level';

  @ApiProperty({ description: '답변' })
  @Column({ nullable: true })
  answer: string | null;

  @ApiProperty({ description: '질문순서' })
  @Column()
  order_no: number;

  @ApiProperty({ description: 'EI 점수' })
  @Column()
  EI_point: number;

  @ApiProperty({ description: 'SN 점수' })
  @Column()
  SN_point: number;

  @ApiProperty({ description: 'TF 점수' })
  @Column()
  TF_point: number;

  @ApiProperty({ description: 'JP 점수' })
  @Column()
  JP_point: number;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일시' })
  createdAt: Date;
}
