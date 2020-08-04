import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    date: string;

    @Column({nullable: true, default: 0})
    amount: number;

    @Column({nullable: true, default: null})
    userId: number;

    @Column({nullable: true, default: null})
    customerId: number;

    @Column({nullable: true, default: null})
    paymentId: number;

    @Column({type: 'text', nullable: true, default: null})
    data: any;

}
