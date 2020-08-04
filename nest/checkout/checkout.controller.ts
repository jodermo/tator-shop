import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Checkout } from './checkout.entity';

@Controller('api/checkout')
export class CheckoutController {
    constructor(private readonly dataService: CheckoutService) {
    }

    @Get()
    getEntries(): Promise<Checkout[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getPaymentById(@Param() params: Checkout): Promise<Checkout> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createPayment(@Body() body: Checkout) {
        if (body) {
            return this.dataService.createCheckout(body);
        }
    }

    @Patch(':id')
    updatePayment(@Param() params: Checkout, @Body() body: Checkout) {
        if (body) {
            return this.dataService.updateCheckout(params.id, body);
        }
    }

    @Delete(':id')
    deletePayment(@Param() params: Checkout) {
        return this.dataService.deleteCheckout(params.id);
    }
}
