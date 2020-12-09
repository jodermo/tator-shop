import { Test, TestingModule } from '@nestjs/testing';
import { ProductGroupController } from './product-group.controller';

describe('ProductGroup Controller', () => {
  let controller: ProductGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductGroupController],
    }).compile();

    controller = module.get<ProductGroupController>(ProductGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
