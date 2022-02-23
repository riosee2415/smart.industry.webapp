const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "ProductImage",
        tableName: "productImages",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductImage.belongsTo(db.Product);
  }
};
