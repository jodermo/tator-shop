import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { Checkout } from './checkout.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Checkout])],
    providers: [CheckoutService],
    controllers: [CheckoutController],
})
export class CheckoutModule {
}
