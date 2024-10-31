import { dbInstance } from "common/services/DBService";
import { DataTypes } from "sequelize";
import { FileModel } from "./FileModel";
export const HistoriquePGModel = dbInstance.define("historiquePg", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateSoumission: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dateSortie: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  nombrePg: DataTypes.INTEGER,
});
