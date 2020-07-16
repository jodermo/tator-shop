import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Shipping } from './shipping.entity';

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(Shipping)
        private readonly shippingRepository: Repository<Shipping>) {
    }

    async findAll(): Promise<Shipping[]> {
        return await this.shippingRepository.find();
    }

    async findById(id: number): Promise<Shipping> {
        const result = await this.shippingRepository.find({id: id});
        return result[0];
    }

    async createShipping(shipping: Shipping): Promise<Shipping> {
        return this.shippingRepository.save(shipping);
    }

    async updateShipping(id: number, shipping: Shipping): Promise<any> {
        await this.shippingRepository.update({id: id}, shipping);
        return await this.shippingRepository.find({id: id});
    }


    async deleteShipping(id: number): Promise<Shipping[]> {
        await this.shippingRepository.delete({id: id});
        return await this.shippingRepository.find();
    }
}
