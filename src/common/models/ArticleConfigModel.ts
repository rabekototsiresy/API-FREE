import { dbInstance } from 'common/services/DBService';
import {DataTypes } from 'sequelize';

export const ArticleConfigModel = dbInstance.define('articleconfig', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
Article: {
  type: DataTypes.STRING,
  allowNull: false,
},
Libelle: {
  type: DataTypes.STRING,
  allowNull: false
},
TypeSIM: {
  type: DataTypes.STRING,
  allowNull: false
},
SuffixeNumPli: {
  type: DataTypes.STRING,
  allowNull: false
},
PoidsSimNu: {
  type: DataTypes.STRING,
  allowNull: false
},
PrefixeICCID: {
  type: DataTypes.STRING,
  allowNull: false
},
TopImpressionImage: {
  type: DataTypes.STRING,
  allowNull: false
},
CodeFichierImage: {
  type: DataTypes.STRING,
  allowNull: true
},
TopImpressionTexteICCID: {
  type: DataTypes.STRING,
  allowNull: true
},
TopImpressionQRCODEICCID: {
  type: DataTypes.STRING,
  allowNull: false
},
NomTemplate: {
  type: DataTypes.STRING,
  allowNull: false
},
TexteAImprimer: {
  type: DataTypes.STRING,
  allowNull: true
},
TypeEnveloppe: {
  type: DataTypes.STRING,
  allowNull: false
},
PoidsEnveloppe: {
  type: DataTypes.STRING,
  allowNull: true
}
 
}
);

