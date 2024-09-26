import { dbInstance } from "common/services/DBService";
import { DataTypes } from "sequelize";

export const ArticleConfigModel = dbInstance.define("articleconfig", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Article: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Libelle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PrefixeICCID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  SuffixeNumPli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PoidsSimNu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PoidsEnveloppe: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  TopImpressionImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CodeFichierImage: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  QRCodeNumPli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ImpressionNumPli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TopImpressionQRCODEICCID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TopImpressionTexteICCID: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  TexteAImprimer: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  NomTemplate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
