import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>) {
    }

    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find();
    }

    async findById(id: number): Promise<Payment> {
        const result = await this.paymentRepository.find({id: id});
        return result[0];
    }

    async createPayment(payment: Payment): Promise<Payment> {
        return this.paymentRepository.save(payment);
    }

    async updatePayment(id: number, payment: Payment): Promise<any> {
        await this.paymentRepository.update({id: id}, payment);
        return await this.paymentRepository.find({id: id});
    }


    async deletePayment(id: number): Promise<Payment[]> {
        await this.paymentRepository.delete({id: id});
        return await this.paymentRepository.find();
    }
}
