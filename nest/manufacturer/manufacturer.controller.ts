import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer.entity';

@Controller('api/manufacturer')
export class ManufacturerController {
    constructor(private readonly dataService: ManufacturerService) {
    }

    @Get()
    getEntries(): Promise<Manufacturer[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getManufacturerById(@Param() params: Manufacturer): Promise<Manufacturer> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createManufacturer(@Body() body: Manufacturer) {
        if (body) {
            return this.dataService.createManufacturer(body);
        }
    }

    @Patch(':id')
    updateManufacturer(@Param() params: Manufacturer, @Body() body: Manufacturer) {
        if (body) {
            return this.dataService.updateManufacturer(params.id, body);
        }
    }

    @Delete(':id')
    deleteManufacturer(@Param() params: Manufacturer) {
        return this.dataService.deleteManufacturer(params.id);
    }
}
