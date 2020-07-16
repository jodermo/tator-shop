import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>) {
    }

    async findAll(): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.find();
    }

    async findById(id: number): Promise<ProductCategory> {
        const result = await this.productCategoryRepository.find({id: id});
        return result[0];
    }

    async createProductCategory(productCategory: ProductCategory): Promise<ProductCategory> {
        return this.productCategoryRepository.save(productCategory);
    }

    async updateProductCategory(id: number, productCategory: ProductCategory): Promise<any> {
        await this.productCategoryRepository.update({id: id}, productCategory);
        return await this.productCategoryRepository.find({id: id});
    }


    async deleteProductCategory(id: number): Promise<ProductCategory[]> {
        await this.productCategoryRepository.delete({id: id});
        return await this.productCategoryRepository.find();
    }
}
