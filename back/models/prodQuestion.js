const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProdQuestion extends Model {
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
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        hit: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isSecret: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        terms: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: true,
        },
      },
      {
        modelName: "ProdQuestion",
        tableName: "prodQuestions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProdQuestion.belongsTo(db.Product);
    db.ProdQuestion.belongsTo(db.User);
  }
};
