import { Request, Response } from "express";
import BaseServiceInteface from "../../@shared/domain/base-service.interface";
import BaseControllerInteface from "../../@shared/domain/base-controller.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "../../../../modules/checkout/usecase/place-order/place-order.dto";

export default class CheckoutController implements BaseControllerInteface {
  constructor(
    private checkoutService: BaseServiceInteface<PlaceOrderInputDto, PlaceOrderOutputDto>
  ) { }

  async handle(request: Request, response: Response) {
    const { clientId, products } = request.body;

    try {
      const input: PlaceOrderInputDto = {
        clientId,
        products: products.map((p: { productId: any }) => {
          return { productId: p.productId }
        })
      }

      const order = await this.checkoutService.execute(input);

      response.status(200).send(order);
    } catch (error) {
      response.status(400).send(error)
    }
  }
}