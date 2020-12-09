import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { Tax } from './tax.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tax])],
    providers: [TaxService],
    controllers: [TaxController],
})
export class TaxModule {
}
