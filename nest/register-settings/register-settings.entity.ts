import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegisterSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    name: string;

    @Column({nullable: true, default: null, length: 255})
    alias: string;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({nullable: true, default: null})
    currencyId: number;

}
