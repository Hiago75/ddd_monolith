import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface ClientAdmFacadeProps {
  findUsecase: UseCaseInterface;
  addUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _addUsecase: UseCaseInterface;

  constructor(props: ClientAdmFacadeProps) {
    this._findUsecase = props.findUsecase;
    this._addUsecase = props.addUsecase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    this._addUsecase.execute(input);
  }

  async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
    return await this._findUsecase.execute(input);
  }
}