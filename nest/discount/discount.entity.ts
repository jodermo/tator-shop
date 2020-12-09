import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    name: string;

    @Column({nullable: true, default: null})
    value: number;

    @Column({nullable: true, default: null, length: 255})
    startDate: string;

    @Column({nullable: true, default: null, length: 255})
    endDate: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    longDescription: string;

    @Column({type: 'text', nullable: true, default: null})
    terms: string;

}
