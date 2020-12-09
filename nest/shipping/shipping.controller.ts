import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { Shipping } from './shipping.entity';

@Controller('api/shipping')
export class ShippingController {
    constructor(private readonly dataService: ShippingService) {
    }

    @Get()
    getEntries(): Promise<Shipping[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getShippingById(@Param() params: Shipping): Promise<Shipping> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createShipping(@Body() body: Shipping) {
        if (body) {
            return this.dataService.createShipping(body);
        }
    }

    @Patch(':id')
    updateShipping(@Param() params: Shipping, @Body() body: Shipping) {
        if (body) {
            return this.dataService.updateShipping(params.id, body);
        }
    }

    @Delete(':id')
    deleteShipping(@Param() params: Shipping) {
        return this.dataService.deleteShipping(params.id);
    }
}
