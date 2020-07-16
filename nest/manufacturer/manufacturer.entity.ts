import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manufacturer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 500})
    name: string;

    @Column({nullable: true, default: null})
    userId: number;

    @Column({nullable: true, default: null, length: 500})
    email: string;

    @Column({nullable: true, default: null})
    logo: number;

    @Column({nullable: true, default: null, length: 500})
    description: string;

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
}
