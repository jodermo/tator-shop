import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { PaymentProcess } from './payment-process.entity';

@Injectable()
export class PaymentProcessService {
    constructor(
        @InjectRepository(PaymentProcess)
        private readonly paymentProcessRepository: Repository<PaymentProcess>) {
    }

    async findAll(): Promise<PaymentProcess[]> {
        return await this.paymentProcessRepository.find();
    }

    async findById(id: number): Promise<PaymentProcess> {
        const result = await this.paymentProcessRepository.find({id: id});
        return result[0];
    }

    async createPaymentProcess(paymentProcess: PaymentProcess): Promise<PaymentProcess> {
        return this.paymentProcessRepository.save(paymentProcess);
    }

    async updatePaymentProcess(id: number, paymentProcess: PaymentProcess): Promise<any> {
        await this.paymentProcessRepository.update({id: id}, paymentProcess);
        return await this.paymentProcessRepository.find({id: id});
    }


    async deletePaymentProcess(id: number): Promise<PaymentProcess[]> {
        await this.paymentProcessRepository.delete({id: id});
        return await this.paymentProcessRepository.find();
    }
}
