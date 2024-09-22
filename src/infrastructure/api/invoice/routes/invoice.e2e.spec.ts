import { app } from '../../express';
import { migrator as migratorSetup } from '../../../resources/db/migrator/config/migrator';
import { sequelize as sequelizeInstance } from '../../sequelize.config';
import request from "supertest";
import { Umzug } from 'umzug';
import { Sequelize } from 'sequelize-typescript';

describe("E2E test for invoice", () => {
  let migrator: Umzug<Sequelize>;

  beforeAll(async () => {
    migrator = migratorSetup(sequelizeInstance);
  });

  beforeEach(async () => {
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down({ to: "2024.09.12T22.10.30.create-order-table-migration.ts" });
  });

  afterAll(async () => {
    await sequelizeInstance.close();
  });

  const createInvoice = async () => {
    await sequelizeInstance.query(`
      INSERT INTO invoices (
        id,
        name,
        document,
        street,
        number,
        complement,
        city,
        state,
        zipCode,
        total,
        createdAt
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?);
    `, {
      replacements: [
        '1',
        'Invoice 1',
        '123456789',
        'Street 1',
        '123',
        'Complement 1',
        'City 1',
        'State 1',
        '12345678',
        100.0,
        new Date(),
      ]
    })
  }

  it("should find a invoice", async () => {
    createInvoice();

    const response = await request(app).get("/invoice/1");

    expect(response.status).toEqual(200)
    expect(response.body.id).toBe('1');
    expect(response.body.name).toBe('Invoice 1');
    expect(response.body.document).toBe('123456789');
    expect(response.body.address).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
  })
})