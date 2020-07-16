import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from './discount.entity';

@Controller('api/discount')
export class DiscountController {
    constructor(private readonly dataService: DiscountService) {
    }

    @Get()
    getEntries(): Promise<Discount[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getDiscountById(@Param() params: Discount): Promise<Discount> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createDiscount(@Body() body: Discount) {
        if (body) {
            return this.dataService.createDiscount(body);
        }
    }

    @Patch(':id')
    updateDiscount(@Param() params: Discount, @Body() body: Discount) {
        if (body) {
            return this.dataService.updateDiscount(params.id, body);
        }
    }

    @Delete(':id')
    deleteDiscount(@Param() params: Discount) {
        return this.dataService.deleteDiscount(params.id);
    }
}
