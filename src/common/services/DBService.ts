import { config } from "config";
import { Dialect, Sequelize } from "sequelize";

export const dbInstance = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect as Dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    port: config.dbPort,
    logging: true,

  });


