import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './product-category.entity';

@Controller('api/product-category')
export class ProductCategoryController {
    constructor(private readonly dataService: ProductCategoryService) {
    }

    @Get()
    getEntries(): Promise<ProductCategory[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getProductCategoryById(@Param() params: ProductCategory): Promise<ProductCategory> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createProductCategory(@Body() body: ProductCategory) {
        if (body) {
            return this.dataService.createProductCategory(body);
        }
    }

    @Patch(':id')
    updateProductCategory(@Param() params: ProductCategory, @Body() body: ProductCategory) {
        if (body) {
            return this.dataService.updateProductCategory(params.id, body);
        }
    }

    @Delete(':id')
    deleteProductCategory(@Param() params: ProductCategory) {
        return this.dataService.deleteProductCategory(params.id);
    }
}
