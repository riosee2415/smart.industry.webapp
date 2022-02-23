const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProdCompany extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "ProdCompany",
        tableName: "prodcompanys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {}
};
