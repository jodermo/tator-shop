import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    productId: number;

    @Column({nullable: true, default: null})
    paymentId: number;

    @Column({nullable: true, default: null})
    shippingId: number;

    @Column({nullable: true, default: null})
    userId: number;

    @Column({nullable: true, default: null})
    amount: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 500})
    email: string;

    @Column({nullable: true, default: null, length: 500})
    salutation: string = '';

    @Column({nullable: true, default: null, length: 500})
    title: string = '';

    @Column({nullable: true, default: null, length: 500})
    firstName: string = '';

    @Column({nullable: true, default: null, length: 500})
    lastName: string;

    @Column({nullable: true, default: null, length: 500})
    tel: string;

    @Column({nullable: true, default: null, length: 500})
    fax: string;

    @Column({nullable: true, default: null, length: 500})
    mobile: string;

    @Column({nullable: true, default: null, length: 500})
    country: string;

    @Column({nullable: true, default: null, length: 500})
    state: string;

    @Column({nullable: true, default: null, length: 500})
    city: string;

    @Column({nullable: true, default: null, length: 500})
    zip: string;

    @Column({nullable: true, default: null, length: 500})
    street: string;

    @Column({nullable: true, default: null, length: 500})
    streetAdditional: string;

    @Column({nullable: true, default: null, length: 500})
    number: string;

    @Column({type: 'text', nullable: true, default: null})
    message: any;

    @Column({type: 'text', nullable: true, default: null})
    files: any;
}
