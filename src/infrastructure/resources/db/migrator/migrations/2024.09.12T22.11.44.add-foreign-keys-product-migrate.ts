import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

const tableName = 'products';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn(tableName, 'invoice_id', {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'invoices',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  await sequelize.getQueryInterface().addColumn(tableName, 'order_id', {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'orders',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn(tableName, 'invoice_id');
  await sequelize.getQueryInterface().removeColumn(tableName, 'order_id');
};
