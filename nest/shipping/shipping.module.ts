import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipping } from './shipping.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Shipping])],
    providers: [ShippingService],
    controllers: [ShippingController],
})
export class ShippingModule {
}
