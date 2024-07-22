import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInteface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInteface {
  constructor(private processPaymentUsecase: UseCaseInterface) { }

  proccess(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUsecase.execute(input);
  }
}