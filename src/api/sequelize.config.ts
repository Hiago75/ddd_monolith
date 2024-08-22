import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import ClientModel from "../modules/client-adm/repository/client.model";
import TransactionModel from "../modules/payment/repository/payment.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import AdmProductModel from "../modules/product-adm/repository/product.model";
import InvoiceItemModel from "../modules/invoice/repository/invoice-item.model";

export let sequelize: Sequelize;

export async function setupSequelize(): Promise<void> {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
  });

  sequelize.addModels([
    InvoiceItemModel,
    InvoiceModel,
    ClientModel,
    TransactionModel,
    StoreCatalogProductModel,
    AdmProductModel
  ]);

  await sequelize.sync();
}