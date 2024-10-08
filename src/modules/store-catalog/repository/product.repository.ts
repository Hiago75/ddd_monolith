import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<ProductEntity[]> {
    const products = await ProductModel.findAll({ raw: true });

    return products.map((product) =>
      new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })
    )
  }

  async find(id: string): Promise<ProductEntity> {
    const product = await ProductModel.findOne({
      where: { id },
      raw: true
    })

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }
}