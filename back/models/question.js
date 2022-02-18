const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Question extends Model {
  static init(sequelize) {
    return super.init(
      {
        author: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        term: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        password: {
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: false,
        },
        answer: {
          type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true,
        },
        answerdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Question",
        tableName: "questions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
