import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    name: string;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({type: 'text', nullable: true, default: null})
    terms: any;

    @Column({nullable: true, default: null})
    discountId: number;

    @Column({type: 'text', nullable: true, default: null})
    image: any;
}
