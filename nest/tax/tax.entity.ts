import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null, length: 30})
    type: string;

    @Column({nullable: true, default: null, length: 255})
    name: string;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({nullable: true, default: null})
    value: number;
}
