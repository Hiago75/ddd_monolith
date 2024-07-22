import AddProductUseCase from "../usecase/add-proudct/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addProductUseCase,
      checkStockUseCase,
    })

    return productFacade
  }
}