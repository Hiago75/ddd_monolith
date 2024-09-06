import AddProductController from "../controllers/add-product.controller";
import AddProductService from "../services/add-product.service";

export const AddProductControllerFactory = () => {
  const service = new AddProductService();
  const controller = new AddProductController(service);

  return controller;
}