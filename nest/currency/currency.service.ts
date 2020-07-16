import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>) {
    }

    async findAll(): Promise<Currency[]> {
        return await this.currencyRepository.find();
    }

    async findById(id: number): Promise<Currency> {
        const result = await this.currencyRepository.find({id: id});
        return result[0];
    }

    async createCurrency(currency: Currency): Promise<Currency> {
        return this.currencyRepository.save(currency);
    }

    async updateCurrency(id: number, currency: Currency): Promise<any> {
        await this.currencyRepository.update({id: id}, currency);
        return await this.currencyRepository.find({id: id});
    }


    async deleteCurrency(id: number): Promise<Currency[]> {
        await this.currencyRepository.delete({id: id});
        return await this.currencyRepository.find();
    }
}
