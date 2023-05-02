'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
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
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a role' },
        notEmpty: { msg: 'role must not be empty' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a role' },
        notEmpty: { msg: 'role must not be empty' },
      },
    },
    // avatar:[ {
    //   public_id: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    //         },
    //   url: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    //   },
    // }],

    resetPasswordToken:{ 
      type: DataTypes.STRING
    },
    resetPasswordExpire:{ 
      type: DataTypes.DATE
    }
   }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  // JWT TOKEN
  // User.methods.getJWTToken = function () {
  //   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRE,
  //   });
  // };
  return User;
};