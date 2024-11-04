import { dbInstance } from "common/services/DBService";
import { DataTypes } from "sequelize";
import { FileModel } from "./FileModel";
export const PilotageModel = dbInstance.define("pilotage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombrePli: DataTypes.INTEGER,
});

PilotageModel.hasMany(FileModel);
FileModel.belongsTo(PilotageModel);
