import { IsInt, IsString } from 'class-validator';

export namespace QuestionDTO {
  export class CreateQuestionDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;

    type: 'radio' | 'level';

    @IsInt()
    order: number;

    @IsInt()
    EI: number;

    @IsInt()
    JP: number;

    @IsInt()
    SN: number;

    @IsInt()
    TF: number;
  }
}
