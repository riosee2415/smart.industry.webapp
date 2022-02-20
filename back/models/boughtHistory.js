const DataTypes = require("sequelize");
const { Model } = DataTypes;
module.exports = class BoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(100), // 회원주문 or 비회원 주문
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER, // 결제 금액
          allowNull: false,
          defaultValue: 0,
        },
        orderNum: {
          type: DataTypes.STRING(100), // 주문번호
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(30), // 주문자
          allowNull: false,
        },
        receiverName: {
          type: DataTypes.STRING(30), // 받는사람
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 전화번호
          allowNull: false,
        },
        receiverMobile: {
          type: DataTypes.STRING(50), // 받는사람 전화번호
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50), // 이메일
          allowNull: false,
        },
        zoneCode: {
          type: DataTypes.STRING(30), // 우편번호
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(200), // 배달 주소
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(300), // 상세 주소
          allowNull: false,
        },
        deliveryMessage: {
          type: DataTypes.TEXT, // 배송 메세지
          allowNull: false,
        },
        payWay: {
          type: DataTypes.STRING(50), // 결제 방법
          allowNull: false,
        },
        delPassword: {
          type: DataTypes.STRING(50), // 주문조회 비밀번호
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
