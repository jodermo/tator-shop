import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProcessController } from './payment-process.controller';

describe('PaymentProcess Controller', () => {
  let controller: PaymentProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentProcessController],
    }).compile();

    controller = module.get<PaymentProcessController>(PaymentProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
