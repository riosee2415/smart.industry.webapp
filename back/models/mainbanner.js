const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MainBanner extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false, // 필수
        },
        mobileImagePath: {
          type: DataTypes.STRING(600),
          allowNull: false, // 필수
        },
        link: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
      },
      {
        modelName: "MainBanner",
        tableName: "mainBanners",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
