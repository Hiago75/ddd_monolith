
import CheckoutController from "../controllers/checkout.controller";
import CheckoutService from "../services/checkout.service";

export const CheckoutControllerFactory = () => {
  const service = new CheckoutService();
  const controller = new CheckoutController(service);

  return controller;
}