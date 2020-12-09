import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProcessService } from './payment-process.service';

describe('PaymentProcessService', () => {
  let service: PaymentProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentProcessService],
    }).compile();

    service = module.get<PaymentProcessService>(PaymentProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
