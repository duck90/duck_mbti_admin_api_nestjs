import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { QuestionEntity } from './question.entity';

@ApiTags('Question API')
@Controller('question')
export class QuestionController {
  constructor(private questionsService: QuestionService) {}

  @Post()
  async create(@Body() question: QuestionEntity): Promise<QuestionEntity> {
    return await this.questionsService.create(question);
  }

  @Get()
  async findAll(): Promise<QuestionEntity[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuestionEntity> {
    return this.questionsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() question: QuestionEntity,
  ): Promise<number> {
    return this.questionsService.update(+id, question);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.questionsService.remove(+id);
  }
}
