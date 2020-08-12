import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterSettingsService } from './register-settings.service';
import { RegisterSettingsController } from './register-settings.controller';
import { RegisterSettings } from './register-settings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RegisterSettings])],
    providers: [RegisterSettingsService],
    controllers: [RegisterSettingsController],
})
export class RegisterSettingsModule {
}
