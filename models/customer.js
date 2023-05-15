'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        max: 30,
        min: 8,
        notNull: { msg: 'User must have a email' },
        isEmail: { msg: 'Must be a valid email address' },
      },
    },
    role: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a role' },
        notEmpty: { msg: 'role must not be empty' },
      },
    },
    phone_number:{
      type: DataTypes.INTEGER
    },
    

  }, {
    sequelize,
    tableName: 'customers',
    modelName: 'Customer',
  });
  return Customer;
};