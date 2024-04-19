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

@Entity({ name: 'test-result' })
export class TestResultEntity {
  @ApiProperty({ description: 'Mbti Test Result PK' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_id: number;

  @ApiProperty({ description: 'MBTI' })
  @Column()
  mbti: string;

  @ApiProperty({ description: 'MBTI img 경로' })
  @Column()
  url: string;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;
}
