import { app } from '../../express';
import request from "supertest";
import { migrator as migratorSetup } from '../../../resources/db/migrator/config/migrator';
import { sequelize as sequelizeInstance } from '../../sequelize.config';
import { Umzug } from 'umzug';
import { Sequelize } from 'sequelize-typescript';
import ClientModel from '../../../../modules/client-adm/repository/client.model';
import { QueryTypes } from 'sequelize';

const addressMock = () => ({
  street: "Rua Qualquer",
  number: "123",
  complement: "Apartamento 101",
  city: "Cidade Qualquer",
  state: "SP",
  zipcode: "12345-678",
});

const createClient = async () => {
  return ClientModel.create({
    id: "1c",
    name: "Cliente Teste",
    email: "cliente@teste.com",
    document: "123456789",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...addressMock(),
  });
};

const createProductCatalog = async (id: string) => {
  const price = 100.0;

  const product = {
    id: id,
    name: "Product 1",
    description: "Description 1",
    purchasePrice: price,
    stock: 10,
    salesPrice: price,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await sequelizeInstance.query(`
    INSERT INTO products (
      id,
      name,
      description,
      purchasePrice,
      stock,
      salesPrice,
      createdAt,
      updatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, {
    replacements: [
      product.id,
      product.name,
      product.description,
      product.purchasePrice,
      product.stock,
      product.salesPrice,
      product.createdAt,
      product.updatedAt
    ],
    type: QueryTypes.INSERT
  });

  return product;
};

describe('E2E test for checkout', () => {
  let migrator: Umzug<Sequelize>;

  beforeAll(async () => {
    migrator = migratorSetup(sequelizeInstance);
  });

  beforeEach(async () => {
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
  });

  afterAll(async () => {
    await migrator.down();
    await sequelizeInstance.close();
  });


  it('should create a checkout', async () => {
    await createClient();
    const product1 = await createProductCatalog("1");
    const product2 = await createProductCatalog("2");

    const products = [
      {
        productId: product1.id,
      },
      {
        productId: product2.id,
      },
    ];

    const response = await request(app).post("/checkout").send({
      clientId: "1c",
      products,
    });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("approved");
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.products).toStrictEqual([{ productId: 1 }, { productId: 2 }])
    expect(response.body.total).toBe(product1.salesPrice + product2.salesPrice);
  })
});