import { AddProductFacadeInputDto } from "../../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../../modules/product-adm/factory/facade.factory";
import { AddProductOutputDto } from "../../../../modules/product-adm/usecase/add-proudct/add-product.dto";

export default class AddProductService {
  async execute(input: AddProductFacadeInputDto): Promise<AddProductOutputDto> {
    const facade = ProductAdmFacadeFactory.create();

    return await facade.addProduct(input);
  }
}