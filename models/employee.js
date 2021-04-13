'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.hasOne = this.belongsTo(models.User);
      //this.hasOne(models.User, { foreignKey: "userId" })
    }
  };
  Employee.init({
    employeeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};