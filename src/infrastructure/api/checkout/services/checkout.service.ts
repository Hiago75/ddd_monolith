import CheckoutFacadeFactory from "../../../../modules/checkout/factory/facade.factory";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "../../../../modules/checkout/usecase/place-order/place-order.dto";

export default class CheckoutService {
  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const facade = CheckoutFacadeFactory.create();

    const result = await facade.execute(input)

    return result
  }
}