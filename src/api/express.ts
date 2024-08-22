import express, { Express } from "express";
import { setupSequelize } from "./sequelize.config";

export const app: Express = express();
app.use(express.json());

setupSequelize()