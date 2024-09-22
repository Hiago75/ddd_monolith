import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import InvoiceModel from "../../invoice/repository/invoice.model";

@Table({
  tableName: 'products',
  timestamps: false
})
export default class ProductOrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: true })
  declare description: string;

  @Column({ allowNull: true })
  declare purchasePrice: number;

  @Column({ allowNull: true })
  declare salesPrice: number;

  @Column({ allowNull: true })
  declare stock: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: true })
  declare invoice_id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: true })
  declare order_id: string;

  @BelongsTo(() => OrderModel, { foreignKey: 'order_id' })
  declare order: Awaited<OrderModel>;

  @Column({ allowNull: true })
  declare createdAt: Date;

  @Column({ allowNull: true })
  declare updatedAt: Date;
}