import { app } from '../../express';
import { sequelize } from '../../sequelize.config';
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      name: "Client 1",
      email: "client@123.com",
      document: "123456789",
      address: {
        street: "Street",
        number: "123",
        complement: "Complement",
        city: "City",
        state: "State",
        zipCode: "123456"
      }
    })

    expect(response.status).toEqual(201)
  })

  it("should not create a client when name is not provided", async () => {
    const reponse = await request(app).post("/clients").send({
      id: "1",
      email: "client@123.com",
      document: "123456789",
      address: {
        street: "Street",
        number: "123",
        complement: "Complement",
        city: "City",
        state: "State",
        zipCode: "123456"
      }
    })

    expect(reponse.status).toEqual(400)
  })
})