import { dbInstance } from "common/services/DBService";
import { DataTypes } from "sequelize";
export const FileModel = dbInstance.define(
  "file",
  {
    TypeProd: {
      type: DataTypes.STRING,
    },
    NumCompteur: {
      type: DataTypes.STRING,
    },
    Activite: {
      type: DataTypes.STRING,
    },
    Depot: {
      type: DataTypes.STRING,
    },
    DateLivraison: {
      type: DataTypes.STRING,
    },
    IdProd: {
      type: DataTypes.STRING,
    },
    Adresse1: {
      type: DataTypes.STRING,
    },
    Adresse2: {
      type: DataTypes.STRING,
    },
    Adresse3: {
      type: DataTypes.STRING,
    },
    Adresse4: {
      type: DataTypes.STRING,
    },
    Adresse5: {
      type: DataTypes.STRING,
    },
    Adresse6: {
      type: DataTypes.STRING,
    },
    CodeArticle: {
      type: DataTypes.STRING,
    },
    CodePostal: {
      type: DataTypes.STRING,
    },
    Commune: {
      type: DataTypes.STRING,
    },
    Smartdata: {
      type: DataTypes.STRING,
    },
    NomPDF: {
      type: DataTypes.STRING,
    },
    Portabilite: {
      type: DataTypes.STRING,
    },
    PosteOffre: {
      type: DataTypes.STRING,
    },
    PosteOption: {
      type: DataTypes.STRING,
    },
    AlliagePremium: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.TINYINT.UNSIGNED, //0: ko,1: ok,2: en cours
    },
    DateFinTraitement: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Utilisateur: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CodeError: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
  },
  {
    // Additional options (timestamps, tableName, etc.) can be added here
  }
);
