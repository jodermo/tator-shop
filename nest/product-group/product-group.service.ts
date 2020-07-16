import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { ProductGroup } from './product-group.entity';

@Injectable()
export class ProductGroupService {
    constructor(
        @InjectRepository(ProductGroup)
        private readonly productGroupRepository: Repository<ProductGroup>) {
    }

    async findAll(): Promise<ProductGroup[]> {
        return await this.productGroupRepository.find();
    }

    async findById(id: number): Promise<ProductGroup> {
        const result = await this.productGroupRepository.find({id: id});
        return result[0];
    }

    async createProductGroup(productGroup: ProductGroup): Promise<ProductGroup> {
        return this.productGroupRepository.save(productGroup);
    }

    async updateProductGroup(id: number, productGroup: ProductGroup): Promise<any> {
        await this.productGroupRepository.update({id: id}, productGroup);
        return await this.productGroupRepository.find({id: id});
    }


    async deleteProductGroup(id: number): Promise<ProductGroup[]> {
        await this.productGroupRepository.delete({id: id});
        return await this.productGroupRepository.find();
    }
}
