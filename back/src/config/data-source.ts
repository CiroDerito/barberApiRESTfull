import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ciro4324925",
    database: "proyecto_de_m3",
    synchronize: true,
    dropSchema: false,
    logging: ["error"],
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})