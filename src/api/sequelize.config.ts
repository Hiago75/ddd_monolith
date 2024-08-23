import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../modules/invoice/repository/invoice-item.model";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import ClientModel from "../modules/client-adm/repository/client.model";
import TransactionModel from "../modules/payment/repository/payment.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import AdmProductModel from "../modules/product-adm/repository/product.model";

export let sequelize: Sequelize;

export async function setupSequelize(): Promise<void> {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
  });

  sequelize.addModels([
    ClientModel,
    TransactionModel,
    StoreCatalogProductModel,
    AdmProductModel,
    InvoiceItemModel,
    InvoiceModel,
  ]);

  await sequelize.sync();
}