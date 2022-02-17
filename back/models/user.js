const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(60), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        normalMobile: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        terms: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
