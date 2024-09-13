import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
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

  @Column({ allowNull: true, type: 'decimal' })
  declare purchasePrice: number;

  @Column({ allowNull: true, type: 'decimal' })
  declare salesPrice: number;

  @Column({ allowNull: true })
  declare stock: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: true })
  declare invoiceId: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: true })
  declare orderId: string;

  @Column({ allowNull: true })
  declare createdAt: Date;

  @Column({ allowNull: true })
  declare updatedAt: Date;
}
