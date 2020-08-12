import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { RegisterSettingsService } from './register-settings.service';
import { RegisterSettings } from './register-settings.entity';

@Controller('api/register-settings')
export class RegisterSettingsController {
    constructor(private readonly dataService: RegisterSettingsService) {
    }

    @Get()
    getEntries(): Promise<RegisterSettings[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getRegisterSettingsById(@Param() params: RegisterSettings): Promise<RegisterSettings> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createRegisterSettings(@Body() body: RegisterSettings) {
        if (body) {
            return this.dataService.createRegisterSettings(body);
        }
    }

    @Patch(':id')
    updateRegisterSettings(@Param() params: RegisterSettings, @Body() body: RegisterSettings) {
        if (body) {
            return this.dataService.updateRegisterSettings(params.id, body);
        }
    }

    @Delete(':id')
    deleteRegisterSettings(@Param() params: RegisterSettings) {
        return this.dataService.deleteRegisterSettings(params.id);
    }
}
