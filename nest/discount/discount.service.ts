import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>) {
    }

    async findAll(): Promise<Discount[]> {
        return await this.discountRepository.find();
    }

    async findById(id: number): Promise<Discount> {
        const result = await this.discountRepository.find({id: id});
        return result[0];
    }

    async createDiscount(discount: Discount): Promise<Discount> {
        return this.discountRepository.save(discount);
    }

    async updateDiscount(id: number, discount: Discount): Promise<any> {
        await this.discountRepository.update({id: id}, discount);
        return await this.discountRepository.find({id: id});
    }


    async deleteDiscount(id: number): Promise<Discount[]> {
        await this.discountRepository.delete({id: id});
        return await this.discountRepository.find();
    }
}
