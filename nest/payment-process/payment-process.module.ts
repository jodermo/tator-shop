import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentProcessService } from './payment-process.service';
import { PaymentProcessController } from './payment-process.controller';
import { PaymentProcess } from './payment-process.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentProcess])],
    providers: [PaymentProcessService],
    controllers: [PaymentProcessController],
})
export class PaymentProcessModule {
}
