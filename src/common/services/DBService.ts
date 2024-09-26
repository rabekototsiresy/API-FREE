import { config } from "config";
import { Dialect, Sequelize } from "sequelize";
const connectionUri = `mysql://${config.dbUser}:${config.dbPassword}@localhost:${config.dbPort}/${config.dbName}`;

export const dbInstance = new Sequelize(connectionUri, {
  dialect: config.dbDialect as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    connectTimeout: 60000,
  },
  logging: config.mode === "dev" ? true : false, // Enable logging for debugging
});

// Construct the connection URI
// const connectionUri = `mysql://${config.dbUser}:${encodeURIComponent(config.dbPassword)}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// export const dbInstance = new Sequelize(connectionUri, {
//   dialect: config.dbDialect as Dialect,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   dialectOptions: {
//     connectTimeout: 60000,
//   },
//   logging: true,
// });

// import { config } from "config";
// import { Dialect, Sequelize } from "sequelize";

// export const dbInstance = new Sequelize(
//   config.dbName,
//   config.dbUser,
//   config.dbPassword,
//   {
//     host: config.dbHost,
//     dialect: config.dbDialect as Dialect,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//     port: config.dbPort,
//     dialectOptions: {
//       connectTimeout: 60000,
//     },
//     logging: true,
//   }
// );
