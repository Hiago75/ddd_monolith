import { join } from "path";
import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";

export const migrator = (sequelize: Sequelize) => new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: join(__dirname, '..') }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
  create: {
    folder: "src/infra/db/sequelize/migrations",
  },
});

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../../../database.sqlite'),
  logging: true
})

if (require.main === module) {
  migrator(sequelize).runAsCLI()
}