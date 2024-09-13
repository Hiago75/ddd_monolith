import express from "express";
import { CheckoutControllerFactory } from "../factories/checkout.factory";

const router = express.Router();

const checkoutController = CheckoutControllerFactory()

router.post("/", checkoutController.handle.bind(checkoutController))

export default router