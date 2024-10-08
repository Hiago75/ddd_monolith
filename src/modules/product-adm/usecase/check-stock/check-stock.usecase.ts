import ProductGateway from "../../gateway/product.gateway";
import ProductRepository from "../../repository/product.repository";
import { CheckStockInputDto, CheckStockOuputDto } from "./check-stock-dto";

export default class CheckStockUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOuputDto> {
    const product = await this._productRepository.find(input.productId)

    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}