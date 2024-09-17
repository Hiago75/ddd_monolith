import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products"
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: true })
  description: string;

  @Column({ allowNull: true })
  salesPrice: number;
}