import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
  Patch,
  UsePipes,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TestResultService } from './test-result.service';
import { TestResultEntity } from './test-result.entity';
import { CreateResultDto } from './dto/create-test-result.dto';

@ApiTags('Test Result API')
@Controller('test-result')
export class TestResultController {
  constructor(private testResultService: TestResultService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  async saveImage(@UploadedFile() file: Express.Multer.File) {
    return await this.testResultService.imageUpload(file);
  }

  @Get(':id')
  async findAll(@Param('id') id: string): Promise<TestResultEntity[]> {
    return this.testResultService.findAll(Number(id));
  }

  @Post()
  async saveOne(@Body() data: CreateResultDto) {
    return await this.testResultService.saveOneResult(data);
  }

  @Post('/multi')
  async saveMany(@Body() data: CreateResultDto[]) {
    return await this.testResultService.saveManyResult(data);
  }
}
