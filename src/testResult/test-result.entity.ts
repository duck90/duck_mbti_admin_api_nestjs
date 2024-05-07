import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TestEntity } from 'src/test/test.entity';

@Entity({ name: 'test_result' })
export class TestResultEntity {
  @ApiProperty({ description: 'Mbti Test Result PK' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestEntity, (test) => test.results)
  @JoinColumn({ name: 'subject_id' })
  test: TestEntity;

  @Column()
  subject_id: number;

  @ApiProperty({ description: 'MBTI' })
  @Column()
  mbti: string;

  @ApiProperty({ description: 'MBTI img 파일 명' })
  @Column()
  filename: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;
}
