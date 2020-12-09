import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('api/product')
export class ProductController {
    constructor(private readonly dataService: ProductService) {
    }

    @Get()
    getEntries(): Promise<Product[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getProductById(@Param() params: Product): Promise<Product> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createProduct(@Body() body: Product) {
        if (body) {
            return this.dataService.createProduct(body);
        }
    }

    @Patch(':id')
    updateProduct(@Param() params: Product, @Body() body: Product) {
        if (body) {
            return this.dataService.updateProduct(params.id, body);
        }
    }

    @Delete(':id')
    deleteProduct(@Param() params: Product) {
        return this.dataService.deleteProduct(params.id);
    }
}
