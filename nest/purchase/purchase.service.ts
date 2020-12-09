import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>) {
    }

    async findAll(): Promise<Purchase[]> {
        return await this.purchaseRepository.find();
    }

    async findById(id: number): Promise<Purchase> {
        const result = await this.purchaseRepository.find({id: id});
        return result[0];
    }

    async createPurchase(purchase: Purchase): Promise<Purchase> {
        return this.purchaseRepository.save(purchase);
    }

    async updatePurchase(id: number, purchase: Purchase): Promise<any> {
        await this.purchaseRepository.update({id: id}, purchase);
        return await this.purchaseRepository.find({id: id});
    }


    async deletePurchase(id: number): Promise<Purchase[]> {
        await this.purchaseRepository.delete({id: id});
        return await this.purchaseRepository.find();
    }
}
