import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>) {
    }

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find();
    }

    async findById(id: number): Promise<Order> {
        const result = await this.orderRepository.find({id: id});
        return result[0];
    }

    async createOrder(order: Order): Promise<Order> {
        return this.orderRepository.save(order);
    }

    async updateOrder(id: number, order: Order): Promise<any> {
        await this.orderRepository.update({id: id}, order);
        return await this.orderRepository.find({id: id});
    }


    async deleteOrder(id: number): Promise<Order[]> {
        await this.orderRepository.delete({id: id});
        return await this.orderRepository.find();
    }
}
