import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentProcess {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    date: string;

    @Column({nullable: true, default: 0})
    amount: number;

    @Column({nullable: true, default: 0})
    given: number;

    @Column({nullable: true, default: null})
    userId: number;

    @Column({nullable: true, default: null})
    checkoutId: number;

    @Column({nullable: true, default: null})
    customerId: number;

    @Column({nullable: true, default: null})
    sellerId: number;

    @Column({nullable: true, default: null, length: 30})
    status: string;

    @Column({type: 'text', nullable: true, default: null})
    message: any;

    @Column({type: 'text', nullable: true, default: null})
    attr: any;

    @Column({type: 'text', nullable: true, default: null})
    data: any;
}
