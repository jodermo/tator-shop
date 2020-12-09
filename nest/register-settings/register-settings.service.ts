import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { RegisterSettings } from './register-settings.entity';

@Injectable()
export class RegisterSettingsService {
    constructor(
        @InjectRepository(RegisterSettings)
        private readonly registerSettingsRepository: Repository<RegisterSettings>) {
    }

    async findAll(): Promise<RegisterSettings[]> {
        return await this.registerSettingsRepository.find();
    }

    async findById(id: number): Promise<RegisterSettings> {
        const result = await this.registerSettingsRepository.find({id: id});
        return result[0];
    }

    async createRegisterSettings(registerSettings: RegisterSettings): Promise<RegisterSettings> {
        return this.registerSettingsRepository.save(registerSettings);
    }

    async updateRegisterSettings(id: number, registerSettings: RegisterSettings): Promise<any> {
        await this.registerSettingsRepository.update({id: id}, registerSettings);
        return await this.registerSettingsRepository.find({id: id});
    }


    async deleteRegisterSettings(id: number): Promise<RegisterSettings[]> {
        await this.registerSettingsRepository.delete({id: id});
        return await this.registerSettingsRepository.find();
    }
}
