import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductOutputDto } from "../usecase/add-proudct/add-product.dto";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
  addProductUseCase: UseCaseInterface
  checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: any;
  private _checkStockUseCase: any;

  constructor(usecasesProps: UseCasesProps) {
    this._addProductUseCase = usecasesProps.addProductUseCase;
    this._checkStockUseCase = usecasesProps.checkStockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<AddProductOutputDto> {
    return this._addProductUseCase.execute(input)
  }

  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input)
  }
}