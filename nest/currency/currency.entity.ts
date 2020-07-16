import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 255})
    name: string;

    @Column({nullable: true, default: null, length: 255})
    iso: string;

    @Column({nullable: true, default: null, length: 255})
    alias: string;

    @Column({nullable: true, default: null, length: 10})
    symbol: string;

    @Column({nullable: true, default: null})
    rate: number = 1;

}
