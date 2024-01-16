const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {  // Cambiado de 'state' a 'status'
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tasks',
    sequelize,
    timestamps: false,
  }
);

module.exports = Task;
