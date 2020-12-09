import { Test, TestingModule } from '@nestjs/testing';
import { RegisterSettingsController } from './register-settings.controller';

describe('RegisterSettings Controller', () => {
  let controller: RegisterSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterSettingsController],
    }).compile();

    controller = module.get<RegisterSettingsController>(RegisterSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
