import express from "express";
import { GetInvoiceControllerFactory } from "../factories/get-invoice.factory";

const router = express.Router();

const getInvoiceController = GetInvoiceControllerFactory();

router.get("/:id", getInvoiceController.handle.bind(getInvoiceController));

export default router