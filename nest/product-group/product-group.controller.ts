import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroup } from './product-group.entity';

@Controller('api/product-group')
export class ProductGroupController {
    constructor(private readonly dataService: ProductGroupService) {
    }

    @Get()
    getEntries(): Promise<ProductGroup[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getProductGroupById(@Param() params: ProductGroup): Promise<ProductGroup> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createProductGroup(@Body() body: ProductGroup) {
        if (body) {
            return this.dataService.createProductGroup(body);
        }
    }

    @Patch(':id')
    updateProductGroup(@Param() params: ProductGroup, @Body() body: ProductGroup) {
        if (body) {
            return this.dataService.updateProductGroup(params.id, body);
        }
    }

    @Delete(':id')
    deleteProductGroup(@Param() params: ProductGroup) {
        return this.dataService.deleteProductGroup(params.id);
    }
}
