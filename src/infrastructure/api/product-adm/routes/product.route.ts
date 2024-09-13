import express from "express";
import { AddProductControllerFactory } from "../factories/add-product.factory";

const router = express.Router();

const addProductController = AddProductControllerFactory()

router.post("/", addProductController.handle.bind(addProductController))

export default router