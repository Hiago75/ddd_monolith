import express, { Express } from "express";
import { setupSequelize } from "./sequelize.config";

import clientsRouter from "./client-adm/routes/client.route";
import productRouter from './product-adm/routes/product.route'

export const app: Express = express();
app.use(express.json());

app.use("/clients", clientsRouter)
app.use('/product', productRouter)

setupSequelize()