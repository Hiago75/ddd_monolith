import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("client repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  })

  it("should find a client", async () => {
    const baseId = "1";

    await ClientModel.create({
      id: baseId,
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const repository = new ClientRepository();
    const result = await repository.find(baseId);

    expect(result.id.id).toEqual(baseId);
    expect(result.name).toEqual("Client 1");
    expect(result.email).toEqual("x@x.com");
    expect(result.address).toEqual("Address 1");
  })

  it("should add a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "client 1",
      email: "x@x.com",
      address: "address 1",
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });


    expect(clientDb).toBeDefined();

    expect(clientDb.getDataValue("id")).toBe(client.id.id);
    expect(clientDb.getDataValue("name")).toBe(client.name);
    expect(clientDb.getDataValue("email")).toBe(client.email);
    expect(clientDb.getDataValue("address")).toBe(client.address);
  })
})