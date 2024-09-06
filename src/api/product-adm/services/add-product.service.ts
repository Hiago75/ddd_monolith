import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export default class AddProductService {
  async execute(input: AddProductFacadeInputDto): Promise<void> {
    const facade = ProductAdmFacadeFactory.create();

    const result = await facade.addProduct(input);

    return result
  }
}