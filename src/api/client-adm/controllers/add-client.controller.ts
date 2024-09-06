import { Request, Response } from "express";
import { AddClientFacadeInputDto } from "../../../modules/client-adm/facade/client-adm.facade.interface";
import BaseServiceInteface from "../../@shared/domain/base-service.interface";
import BaseControllerInteface from "../../@shared/domain/base-controller.interface";

export default class AddClientController implements BaseControllerInteface {
  constructor(
    private clientService: BaseServiceInteface<AddClientFacadeInputDto, void>
  ) { }

  async handle(request: Request, response: Response) {
    const { id, name, email, address, document } = request.body;

    try {
      const clientDto: AddClientFacadeInputDto = {
        id,
        name,
        email,
        document,
        address
      }

      await this.clientService.execute(clientDto)

      response.status(201).send();
    } catch (error) {
      response.status(400).send(error)
    }
  }
}