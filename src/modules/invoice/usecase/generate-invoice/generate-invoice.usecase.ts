import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface"
import Address from "../../../@shared/domain/value-object/address";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";
import InvoiceGateway from "../../gateway/invoice.gateway"
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice-dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly invoiceGateway: InvoiceGateway) { }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoiceProps = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address(input.street, input.number, input.complement, input.city, input.state, input.zipCode),
      items: input.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });

    await this.invoiceGateway.create(invoiceProps);

    return {
      id: invoiceProps.id.id,
      name: invoiceProps.name,
      document: invoiceProps.document,
      street: invoiceProps.address.street,
      number: invoiceProps.address.number,
      complement: invoiceProps.address.complement,
      city: invoiceProps.address.city,
      state: invoiceProps.address.state,
      zipCode: invoiceProps.address.zipCode,
      items: invoiceProps.items.map((item: any) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoiceProps.total,
    };
  }
} 