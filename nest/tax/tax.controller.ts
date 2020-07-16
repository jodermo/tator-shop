import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { TaxService } from './tax.service';
import { Tax } from './tax.entity';

@Controller('api/tax')
export class TaxController {
    constructor(private readonly dataService: TaxService) {
    }

    @Get()
    getEntries(): Promise<Tax[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getTaxById(@Param() params: Tax): Promise<Tax> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createTax(@Body() body: Tax) {
        if (body) {
            return this.dataService.createTax(body);
        }
    }

    @Patch(':id')
    updateTax(@Param() params: Tax, @Body() body: Tax) {
        if (body) {
            return this.dataService.updateTax(params.id, body);
        }
    }

    @Delete(':id')
    deleteTax(@Param() params: Tax) {
        return this.dataService.deleteTax(params.id);
    }
}
