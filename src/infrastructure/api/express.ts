import express, { Express } from "express";
import { setupSequelize } from "./sequelize.config";

import clientsRouter from "./client-adm/routes/client.route";
import productRouter from './product-adm/routes/product.route'
import checkoutRouter from './checkout/routes/checkout.route'

export const app: Express = express();
app.use(express.json());

app.use("/clients", clientsRouter)
app.use('/product', productRouter)
app.use('/checkout', checkoutRouter)

setupSequelize()