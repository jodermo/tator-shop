import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { ProductType } from './product-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductType])],
    providers: [ProductTypeService],
    controllers: [ProductTypeController],
})
export class ProductTypeModule {
}
