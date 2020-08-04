import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { ProductType } from './product-type.entity';

@Injectable()
export class ProductTypeService {
    constructor(
        @InjectRepository(ProductType)
        private readonly productTypeRepository: Repository<ProductType>) {
    }

    async findAll(): Promise<ProductType[]> {
        return await this.productTypeRepository.find();
    }

    async findById(id: number): Promise<ProductType> {
        const result = await this.productTypeRepository.find({id: id});
        return result[0];
    }

    async createProductType(productType: ProductType): Promise<ProductType> {
        return this.productTypeRepository.save(productType);
    }

    async updateProductType(id: number, productType: ProductType): Promise<any> {
        await this.productTypeRepository.update({id: id}, productType);
        return await this.productTypeRepository.find({id: id});
    }


    async deleteProductType(id: number): Promise<ProductType[]> {
        await this.productTypeRepository.delete({id: id});
        return await this.productTypeRepository.find();
    }
}
