const DataTypes = require("sequelize");
const { Model } = DataTypes;
module.exports = class BoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        orderNum: {
          type: DataTypes.STRING(100), // 주문번호
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER, // 결제 금액
          allowNull: false,
          defaultValue: 0,
        },
        discount: {
          type: DataTypes.FLOAT, // 할인 금액
          allowNull: false,
          defaultValue: 0.0,
        },
        deliveryPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 3000,
        },
        name: {
          type: DataTypes.STRING(30), // 주문자
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT, // 내용
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 전화번호
          allowNull: false,
        },
        deliveryCom: {
          type: DataTypes.STRING(300), // 배송 회사 (택배사)
          allowNull: true,
        },
        deliveryNo: {
          type: DataTypes.STRING(100), // 송장번호
          allowNull: true,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "BoughtHistory",
        tableName: "boughtHistorys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtHistory.belongsTo(db.User);
    db.BoughtHistory.hasMany(db.WishItem);
  }
};
