import { Request, Response } from "express";
import BaseControllerInteface from "../../@shared/domain/base-controller.interface";
import BaseServiceInteface from "../../@shared/domain/base-service.interface";
import { FindInvoiceUseCaseInputDTO } from "../../../../modules/invoice/usecase/find-invoice/find-invoice.dto";
import { FindInvoiceFacadeOutputDTO } from "../../../../modules/invoice/facade/invoice.facade.interface";

export default class GetInvoiceController implements BaseControllerInteface {
  constructor(private invoiceService: BaseServiceInteface<String, FindInvoiceFacadeOutputDTO>) { }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params

    try {
      const invoice = await this.invoiceService.execute(id)

      response.status(200).send(invoice)
    } catch (error) {
      response.status(400).send(error)
    }
  }
}