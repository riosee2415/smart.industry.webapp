const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Menu extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        imagePath2: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Menu",
        tableName: "menus",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Menu.hasMany(db.Category);
  }
};
