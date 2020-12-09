import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';

@Controller('api/payment')
export class PaymentController {
    constructor(private readonly dataService: PaymentService) {
    }

    @Get()
    getEntries(): Promise<Payment[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getPaymentById(@Param() params: Payment): Promise<Payment> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createPayment(@Body() body: Payment) {
        if (body) {
            return this.dataService.createPayment(body);
        }
    }

    @Patch(':id')
    updatePayment(@Param() params: Payment, @Body() body: Payment) {
        if (body) {
            return this.dataService.updatePayment(params.id, body);
        }
    }

    @Delete(':id')
    deletePayment(@Param() params: Payment) {
        return this.dataService.deletePayment(params.id);
    }
}
