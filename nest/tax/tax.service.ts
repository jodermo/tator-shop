import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Tax } from './tax.entity';

@Injectable()
export class TaxService {
    constructor(
        @InjectRepository(Tax)
        private readonly taxRepository: Repository<Tax>) {
    }

    async findAll(): Promise<Tax[]> {
        return await this.taxRepository.find();
    }

    async findById(id: number): Promise<Tax> {
        const result = await this.taxRepository.find({id: id});
        return result[0];
    }

    async createTax(tax: Tax): Promise<Tax> {
        return this.taxRepository.save(tax);
    }

    async updateTax(id: number, tax: Tax): Promise<any> {
        await this.taxRepository.update({id: id}, tax);
        return await this.taxRepository.find({id: id});
    }


    async deleteTax(id: number): Promise<Tax[]> {
        await this.taxRepository.delete({id: id});
        return await this.taxRepository.find();
    }
}
