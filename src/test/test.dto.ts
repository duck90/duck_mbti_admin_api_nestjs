import { IsInt, IsString } from 'class-validator';
import { QuestionDTO } from 'src/question/question.dto';

export namespace TestDTO {
  export class CreateTestDto {
    @IsString()
    title: string;

    @IsString()
    subtitle: string;

    @IsString()
    description: string;

    questions: QuestionDTO.CreateQuestionDto[];
  }

  export class UpdateTestActiveDto extends CreateTestDto {
    @IsInt()
    id: number;

    active: boolean;
  }

  export class UpdateTestOrderDto {
    @IsInt()
    id: number;

    @IsInt()
    order_no: number;
  }
}
