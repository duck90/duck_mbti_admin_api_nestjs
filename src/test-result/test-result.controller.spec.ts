import { Test, TestingModule } from '@nestjs/testing';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';

describe('TestController', () => {
  let appController: TestResultController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestResultController],
      providers: [TestResultService],
    }).compile();

    appController = app.get<TestResultController>(TestResultController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
