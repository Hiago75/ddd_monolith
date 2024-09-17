import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

const tableName = "products";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn(tableName, "salesPrice", {
    type: DataTypes.FLOAT,
    allowNull: true,
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn(tableName, "salesPrice");
};
