import { dbInstance } from "common/services/DBService";
import { DataTypes } from "sequelize";
export const OrdonnancementModel = dbInstance.define("ordonnancement", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  typeDocument: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jour_retention: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  poidsAnnexe: {
    type: DataTypes.DOUBLE.UNSIGNED,
    allowNull: false,
  },
});
