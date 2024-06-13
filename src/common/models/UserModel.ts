import { dbInstance } from 'common/services/DBService';
import {DataTypes } from 'sequelize';

export const UserModel = dbInstance.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: DataTypes.STRING,
  role: DataTypes.INTEGER,
  password: DataTypes.STRING,
 
},
{
  hooks: {
      afterCreate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.updatedAt;
      },
      afterUpdate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.updatedAt;
      },
  }
}
);

