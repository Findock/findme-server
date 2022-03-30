import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FindMeSeederLog {
    @PrimaryGeneratedColumn()
    public int: number;

    @Column()
    public key: string;

    @Column({ default: true })
    public seeded: boolean;
}
