import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TestService } from './test.service';
import { TestEntity } from './test.entity';
import { TestDTO } from './test.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/guard/role';
import { Role } from 'src/auth/auth.dto';

@ApiTags('Test API')
@UseGuards(AuthGuard)
@Controller('test')
export class TestController {
  constructor(private testsService: TestService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(): Promise<TestEntity[]> {
    return this.testsService.findAll();
  }

  @Post()
  async create(@Body() test: TestDTO.CreateTestDto): Promise<TestEntity> {
    return await this.testsService.create(test);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TestEntity> {
    return this.testsService.findOne(+id);
  }

  @Put(':id')
  async updateTest(
    @Param('id') id: number,
    @Body() test: TestDTO.CreateTestDto,
  ): Promise<number> {
    return this.testsService.updateTest(id, test);
  }

  @Patch(':id')
  async updateActive(
    @Param('id') id: string,
    @Body() data: TestDTO.UpdateTestActiveDto,
  ): Promise<number> {
    return this.testsService.updateActive(+id, data.active);
  }

  @Post('order')
  async updateOrder(
    @Body() data: TestDTO.UpdateTestOrderDto[],
  ): Promise<string> {
    return this.testsService.updateOrder(data);
  }
}
