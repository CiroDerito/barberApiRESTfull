import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum AppointmentStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled'
}

@Entity({ name: "appointments" })
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: string;

    @Column()
    time!: string;

    @Column()
    userId!: number;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE,
    })
    status!: AppointmentStatus;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @ManyToOne(() => User, (user) => user.appointment)
    user: User;
}
