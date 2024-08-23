import express, { Express } from "express";
import { setupSequelize } from "./sequelize.config";

import clientsRouter from "./client/routes/client.route";

export const app: Express = express();
app.use(express.json());

app.use("/clients", clientsRouter)

setupSequelize()