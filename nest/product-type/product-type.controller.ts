import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductType } from './product-type.entity';

@Controller('api/product-type')
export class ProductTypeController {
    constructor(private readonly dataService: ProductTypeService) {
    }

    @Get()
    getEntries(): Promise<ProductType[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getProductCategoryById(@Param() params: ProductType): Promise<ProductType> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createProductCategory(@Body() body: ProductType) {
        if (body) {
            return this.dataService.createProductType(body);
        }
    }

    @Patch(':id')
    updateProductCategory(@Param() params: ProductType, @Body() body: ProductType) {
        if (body) {
            return this.dataService.updateProductType(params.id, body);
        }
    }

    @Delete(':id')
    deleteProductCategory(@Param() params: ProductType) {
        return this.dataService.deleteProductType(params.id);
    }
}
