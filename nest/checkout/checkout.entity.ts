import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    startDate: string;

    @Column({nullable: true, default: null, length: 255})
    endDate: string;

    @Column({nullable: true, default: false})
    canceled: boolean;

    @Column({nullable: true, default: 0})
    amount: number;

    @Column({nullable: true, default: 0})
    given: number;

    @Column({nullable: true, default: 0})
    tip: number;

    @Column({nullable: true, default: null})
    userId: number;

    @Column({nullable: true, default: null})
    customerId: number;

    @Column({nullable: true, default: null})
    paymentId: number;

    @Column({type: 'text', nullable: true, default: null})
    discountIds: any;

    @Column({nullable: true, default: null})
    taxId: number;

    @Column({type: 'text', nullable: true, default: null})
    history: any;

    @Column({type: 'text', nullable: true, default: null})
    data: any;

}
