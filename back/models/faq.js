const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Faq extends Model {
  static init(sequelize) {
    return super.init(
      {
        question: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        answer: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Faq",
        tableName: "faqs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Faq.belongsTo(db.FaqType);
  }
};
