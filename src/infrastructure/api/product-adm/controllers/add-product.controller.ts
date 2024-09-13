import { Request, Response } from "express";
import BaseServiceInteface from "../../@shared/domain/base-service.interface";
import BaseControllerInteface from "../../@shared/domain/base-controller.interface";
import { AddProductFacadeInputDto } from "../../../../modules/product-adm/facade/product-adm.facade.interface";
import { AddProductOutputDto } from "../../../../modules/product-adm/usecase/add-proudct/add-product.dto";

export default class AddProductController implements BaseControllerInteface {
  constructor(
    private productService: BaseServiceInteface<AddProductFacadeInputDto, AddProductOutputDto>
  ) { }

  async handle(request: Request, response: Response) {
    const { id, name, description, purchasePrice, stock } = request.body;

    try {
      const input: AddProductFacadeInputDto = {
        id,
        name,
        description,
        purchasePrice,
        stock
      }

      const product = await this.productService.execute(input);

      response.status(200).send(product);
    } catch (error) {
      response.status(400).send(error)
    }
  }
}