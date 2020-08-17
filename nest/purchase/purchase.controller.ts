import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';

@Controller('api/purchase')
export class PurchaseController {
    constructor(private readonly dataService: PurchaseService) {
    }

    @Get()
    getEntries(): Promise<Purchase[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getPurchaseById(@Param() params: Purchase): Promise<Purchase> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createPurchase(@Body() body: Purchase) {
        if (body) {
            return this.dataService.createPurchase(body);
        }
    }

    @Patch(':id')
    updatePurchase(@Param() params: Purchase, @Body() body: Purchase) {
        if (body) {
            return this.dataService.updatePurchase(params.id, body);
        }
    }

    @Delete(':id')
    deletePurchase(@Param() params: Purchase) {
        return this.dataService.deletePurchase(params.id);
    }
}
