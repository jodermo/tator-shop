import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { PaymentProcessService } from './payment-process.service';
import { PaymentProcess } from './payment-process.entity';

@Controller('api/payment-process')
export class PaymentProcessController {
    constructor(private readonly dataService: PaymentProcessService) {
    }

    @Get()
    getEntries(): Promise<PaymentProcess[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getProductCategoryById(@Param() params: PaymentProcess): Promise<PaymentProcess> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createProductCategory(@Body() body: PaymentProcess) {
        if (body) {
            return this.dataService.createPaymentProcess(body);
        }
    }

    @Patch(':id')
    updateProductCategory(@Param() params: PaymentProcess, @Body() body: PaymentProcess) {
        if (body) {
            return this.dataService.updatePaymentProcess(params.id, body);
        }
    }

    @Delete(':id')
    deleteProductCategory(@Param() params: PaymentProcess) {
        return this.dataService.deletePaymentProcess(params.id);
    }
}
