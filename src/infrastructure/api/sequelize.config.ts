import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import ClientModel from "../../modules/client-adm/repository/client.model";
import TransactionModel from "../../modules/payment/repository/payment.model";
import StoreCatalogProductModel from "../../modules/store-catalog/repository/product.model";
import AdmProductModel from "../../modules/product-adm/repository/product.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import ClientOrderModel from "../../modules/checkout/repository/client.order.model";
import ProductOrderModel from "../../modules/checkout/repository/product.order.model";

export let sequelize: Sequelize;

export async function setupSequelize(): Promise<Sequelize> {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false
    });

    sequelize.addModels([
      ClientModel,
      ClientOrderModel,
      InvoiceItemModel,
      InvoiceModel,
      OrderModel,
      TransactionModel,
      StoreCatalogProductModel,
      AdmProductModel,
      ProductOrderModel,
    ]);

    await sequelize.sync();
  }

  return sequelize;
}