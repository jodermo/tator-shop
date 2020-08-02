import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 500})
    name: string;

    @Column({nullable: true, default: null, length: 500})
    alias: string;

    @Column({nullable: true, default: null, length: 500})
    itemNumber: string;

    @Column({nullable: true, default: null})
    imageId: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null})
    price: number;

    @Column({nullable: true, default: null})
    stock: number;

    @Column({nullable: true, default: null})
    manufacturerId: number;

    @Column({nullable: true, default: null})
    currencyId: number;

    @Column({nullable: true, default: null})
    categoryId: number;

    @Column({nullable: true, default: null})
    groupId: number;

    @Column({nullable: true, default: null})
    taxId: number;

    @Column({nullable: true, default: null})
    discountId: number;

    @Column({type: 'text', nullable: true, default: null})
    shippingIds: any;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({type: 'text', nullable: true, default: null})
    longDescription: any;

    @Column({type: 'text', nullable: true, default: null})
    files: any;

    @Column({type: 'text', nullable: true, default: null})
    attr: any;

    @Column({type: 'text', nullable: true, default: null})
    data: any;
}
