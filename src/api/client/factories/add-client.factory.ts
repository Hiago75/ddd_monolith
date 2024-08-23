import AddClientController from "../controllers/add-client.controller";
import AddClientService from "../services/add-client.service";

export const AddClientControllerFactory = () => {
  const service = new AddClientService();
  const controller = new AddClientController(service);

  return controller;
}