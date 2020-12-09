import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGroupService } from './product-group.service';
import { ProductGroupController } from './product-group.controller';
import { ProductGroup } from './product-group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductGroup])],
    providers: [ProductGroupService],
    controllers: [ProductGroupController],
})
export class ProductGroupModule {
}
