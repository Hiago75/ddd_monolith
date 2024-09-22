import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
  tableName: 'clients',
  timestamps: false,
})
export default class ClientOrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

  @HasMany(() => OrderModel)
  declare orders?: Awaited<OrderModel[]>
}
