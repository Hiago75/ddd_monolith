import express from "express";
import { AddClientControllerFactory } from "../factories/add-client.factory";

const router = express.Router();

const addClientController = AddClientControllerFactory()

router.post("/", addClientController.handle.bind(addClientController))

export default router