import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './auth.controller';
import { TestService } from './auth.service';

describe('TestController', () => {
  let appController: TestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    appController = app.get<TestController>(TestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
