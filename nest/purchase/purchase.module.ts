import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './purchase.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Purchase])],
    providers: [PurchaseService],
    controllers: [PurchaseController],
})
export class PurchaseModule {
}
