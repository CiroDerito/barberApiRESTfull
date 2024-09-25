import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    birthdate!: string;

    @Column({ unique: true })
    nDni!: number;

    @Column({ nullable: true })
    profileImage?: string;

    @OneToOne(() => Credential)
    @JoinColumn({ name: "credential_id" })
    credential: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointment: Appointment[];
}
