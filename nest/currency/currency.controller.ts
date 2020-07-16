import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from './currency.entity';

@Controller('api/currency')
export class CurrencyController {
    constructor(private readonly dataService: CurrencyService) {
    }

    @Get()
    getEntries(): Promise<Currency[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getCurrencyById(@Param() params: Currency): Promise<Currency> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createCurrency(@Body() body: Currency) {
        if (body) {
            return this.dataService.createCurrency(body);
        }
    }

    @Patch(':id')
    updateCurrency(@Param() params: Currency, @Body() body: Currency) {
        if (body) {
            return this.dataService.updateCurrency(params.id, body);
        }
    }

    @Delete(':id')
    deleteCurrency(@Param() params: Currency) {
        return this.dataService.deleteCurrency(params.id);
    }
}
