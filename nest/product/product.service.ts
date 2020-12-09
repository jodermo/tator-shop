import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>) {
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findById(id: number): Promise<Product> {
        const result = await this.productRepository.find({id: id});
        return result[0];
    }

    async createProduct(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async updateProduct(id: number, product: Product): Promise<any> {
        await this.productRepository.update({id: id}, product);
        return await this.productRepository.find({id: id});
    }


    async deleteProduct(id: number): Promise<Product[]> {
        await this.productRepository.delete({id: id});
        return await this.productRepository.find();
    }
}
