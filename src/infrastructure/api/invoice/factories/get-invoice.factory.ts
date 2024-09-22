import GetInvoiceController from "../contollers/get-invoice.controller";
import GetInvoiceService from "../services/get-invoice.service";

export const GetInvoiceControllerFactory = () => {
  const service = new GetInvoiceService();
  const controller = new GetInvoiceController(service);

  return controller
}