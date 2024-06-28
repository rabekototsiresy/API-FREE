import { dbInstance } from 'common/services/DBService';
import {DataTypes } from 'sequelize';
export const OrdonnancementModel = dbInstance.define('ordonnancement', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  flux: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  periodicite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  heureApprox: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ordrePriorite: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  massificationFlux: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  fonctionVolumePliTraiter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  massification: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  triPrioriteEnDP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  retentionFlux: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tarifEtDelaiAffrCIP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servicesPostaux: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  traitementForce: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  heureLimiteTraitement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commentaires: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

