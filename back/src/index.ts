import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { error } from "console";
import { AppDataSource } from "./config/data-source";
AppDataSource.initialize()
    .then(res => {
        console.log("DB Conectada con exito");
        app.listen(PORT || 3002, () => {
            console.log(`Server listening on http://localhost:${PORT}`);

        })
    })
    .catch(res => {
        console.error("Erro al conectar la base de datos", error)
    })
