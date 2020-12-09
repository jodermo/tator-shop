import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Checkout } from './checkout.entity';

@Injectable()
export class CheckoutService {
    constructor(
        @InjectRepository(Checkout)
        private readonly checkoutRepository: Repository<Checkout>) {
    }

    async findAll(): Promise<Checkout[]> {
        return await this.checkoutRepository.find();
    }

    async findById(id: number): Promise<Checkout> {
        const result = await this.checkoutRepository.find({id: id});
        return result[0];
    }

    async createCheckout(checkout: Checkout): Promise<Checkout> {
        return this.checkoutRepository.save(checkout);
    }

    async updateCheckout(id: number, checkout: Checkout): Promise<any> {
        await this.checkoutRepository.update({id: id}, checkout);
        return await this.checkoutRepository.find({id: id});
    }


    async deleteCheckout(id: number): Promise<Checkout[]> {
        await this.checkoutRepository.delete({id: id});
        return await this.checkoutRepository.find();
    }
}
