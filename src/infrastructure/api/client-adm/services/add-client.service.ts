import { AddClientFacadeInputDto } from "../../../../modules/client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../../../modules/client-adm/factory/client-adm.facade.factory";

export default class AddClientService {
  async execute(input: AddClientFacadeInputDto): Promise<void> {
    const facade = ClientAdmFacadeFactory.create();

    await facade.add(input);
  }
}