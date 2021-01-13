'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
    }
  }
  Image.init(
    {
      imageName: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      imageId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      permission: {
        type: DataTypes.ENUM("private", "public"),
        defaultValue: "public",
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};