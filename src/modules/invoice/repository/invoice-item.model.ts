import { BelongsTo, Column, ForeignKey, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript/dist/model/table/table";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoices_items",
  timestamps: false,
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  declare invoice: Awaited<InvoiceModel>;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}