import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { Discount } from './discount.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Discount])],
    providers: [DiscountService],
    controllers: [DiscountController],
})
export class DiscountModule {
}
