import { FindInvoiceFacadeOutputDTO } from "../../../../modules/invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../../../modules/invoice/factory/facade.factory";

export default class GetInvoiceService {
  async execute(id: string): Promise<FindInvoiceFacadeOutputDTO> {
    const facade = InvoiceFacadeFactory.create();

    return await facade.find(id)
  }
}