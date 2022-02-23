const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        thumbnail: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        youtubeLink: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0.0,
        },
        deliveryPay: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2500,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isUsed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isSale: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isBest: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Product",
        tableName: "products",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.Category);
    db.Product.belongsTo(db.ProdCompany);
  }
};
