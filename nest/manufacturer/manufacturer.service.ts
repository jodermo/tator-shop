import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturerService {
    constructor(
        @InjectRepository(Manufacturer)
        private readonly manufacturerRepository: Repository<Manufacturer>) {
    }

    async findAll(): Promise<Manufacturer[]> {
        return await this.manufacturerRepository.find();
    }

    async findById(id: number): Promise<Manufacturer> {
        const result = await this.manufacturerRepository.find({id: id});
        return result[0];
    }

    async createManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
        return this.manufacturerRepository.save(manufacturer);
    }

    async updateManufacturer(id: number, manufacturer: Manufacturer): Promise<any> {
        await this.manufacturerRepository.update({id: id}, manufacturer);
        return await this.manufacturerRepository.find({id: id});
    }


    async deleteManufacturer(id: number): Promise<Manufacturer[]> {
        await this.manufacturerRepository.delete({id: id});
        return await this.manufacturerRepository.find();
    }
}
