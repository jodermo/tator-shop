import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: 'default', length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    date: string;

    @Column({nullable: true, default: null, length: 255})
    name: string;

    @Column({nullable: true, default: null, length: 255})
    alias: string;

    @Column({nullable: true, default: null})
    userId: number;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({nullable: true, default: 0})
    amount: number;

    @Column({nullable: true, default: 0})
    tip: number;

    @Column({nullable: true, default: null})
    customerId: number;

    @Column({nullable: true, default: null})
    taxId: number;

    @Column({type: 'text', nullable: true, default: null})
    data: any;
}
