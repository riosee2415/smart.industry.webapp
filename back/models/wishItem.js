const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class WishItem extends Model {
  static init(sequelize) {
    return super.init(
      {
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        modelName: "WishItem",
        tableName: "wishItems",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.WishItem.belongsTo(db.Product);
  }
};
