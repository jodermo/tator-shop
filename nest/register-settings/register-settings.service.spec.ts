import { Test, TestingModule } from '@nestjs/testing';
import { RegisterSettingsService } from './register-settings.service';

describe('RegisterSettingsService', () => {
  let service: RegisterSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterSettingsService],
    }).compile();

    service = module.get<RegisterSettingsService>(RegisterSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
