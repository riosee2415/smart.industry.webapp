const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const {
  Product,
  BoughtHistory,
  User,
  WishItem,
  Category,
} = require("../models");
const models = require("../models");
const deliverySearch = require("../utils/deliverySearch");
const router = express.Router();

//////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// BOUGHT HISTORY 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
//////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

router.get("list", isLoggedIn, async (req, res, next) => {
  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }
  try {
    const selectQuery = `
    SELECT	A.id																				AS	wishId,
            A.count,
            B.id,
            B.type,
            B.price,
            B.orderNum,
            B.name,
            B.receiverName,
            B.mobile,
            B.receiverMobile,
            B.email,
            B.zoneCode,
            B.address,
            B.detailAddress,
            B.deliveryMessage,
            B.delPassword,
            B.deliveryCom,
            B.deliveryNo,
            B.isCompleted,
            DATE_FORMAT(B.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(B.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            B.UserId,
            C.id 																				AS	prodId,
            C.thumbnail,
            C.title,
            C.price																				AS	prodPrice,
            C.discount																			AS	prodDiscount,
            C.deliveryPay 																		AS	prodDelPay
    FROM	wishItems 				A
   INNER
    JOIN	boughtHistorys			B
      ON	A.BoughtHistoryId = B.id
   INNER		
    JOIN	products				C
      ON	A.ProductId = C.id
   WHERE    B.UserId = ${req.user.id}
      `;

    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json({ lists: lists[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("주문내역을 불러올 수 없습니다.");
  }
});

router.post("/notUserList", async (req, res, next) => {
  const { delPassword } = req.body;
  try {
    if (delPassword === "-") {
      return res.status(401).send("올바른 주문 비밀번호를 입력하여 주십시오.");
    }

    const selectQuery = `
    SELECT	A.id																				AS	wishId,
            A.count,
            B.id,
            B.type,
            B.price,
            B.orderNum,
            B.name,
            B.receiverName,
            B.mobile,
            B.receiverMobile,
            B.email,
            B.zoneCode,
            B.address,
            B.detailAddress,
            B.deliveryMessage,
            B.delPassword,
            B.deliveryCom,
            B.deliveryNo,
            B.isCompleted,
            DATE_FORMAT(B.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(B.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            B.UserId,
            C.id 																				AS	prodId,
            C.thumbnail,
            C.title,
            C.price																				AS	prodPrice,
            C.discount																			AS	prodDiscount,
            C.deliveryPay 																		AS	prodDelPay
    FROM	wishItems 				A
   INNER
    JOIN	boughtHistorys			B
      ON	A.BoughtHistoryId = B.id
   INNER		
    JOIN	products				C
      ON	A.ProductId = C.id
   WHERE    B.delPassword = '${delPassword}'
      `;

    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json({ lists: lists[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("주문내역을 불러올 수 없습니다.");
  }
});

router.get("/admin/list", isAdminCheck, async (req, res, next) => {
  try {
    const selectQuery = `
      SELECT	A.id,
                A.type,
                A.price,
                A.orderNum,
                A.name,
                A.receiverName,
                A.mobile,
                A.receiverMobile,
                A.email,
                A.zoneCode,
                A.address,
                A.detailAddress,
                A.deliveryMessage,
                A.delPassword,
                A.deliveryCom,
                A.deliveryNo,
                A.isCompleted,
                DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
                DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
                A.UserId
        FROM	boughtHistorys 		    A
      `;

    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json({
      list: list[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("주문내역을 불러올 수 없습니다.");
  }
});

router.get("/admin/list/:id", async (req, res, next) => {
  const { id } = req.params;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const selectQuery = `
    SELECT	A.id,
            A.count,
            A.ProductId,
            A.BoughtHistoryId,
            B.thumbnail,
            B.title,
            B.price,
            B.discount,
            B.deliveryPay
    FROM	wishItems			A
   INNER
    JOIN	products 			B
      ON	A.ProductId = B.id
  WHERE 	A.BoughtHistoryId = ${id}
    `;

    const detailList = await models.sequelize.query(selectQuery);

    return res.status(200).json({
      detailList: detailList[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("주문내역 정보를 불러올 수 없습니다.");
  }
});

router.post("/user/create", isLoggedIn, async (req, res, next) => {
  const {
    price,
    orderNum,
    name,
    receiverName,
    mobile,
    receiverMobile,
    email,
    zoneCode,
    address,
    detailAddress,
    deliveryMessage,
    payWay,
  } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const createResult = await BoughtHistory.create({
      type: "회원주문",
      price,
      orderNum,
      name,
      receiverName,
      mobile,
      receiverMobile,
      email,
      zoneCode,
      address,
      detailAddress,
      deliveryMessage,
      payWay,
      UserId: parseInt(req.user.id),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true, id: createResult.id });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 결제할 수 없습니다.");
  }
});

router.post("/user/wishcreate", isLoggedIn, async (req, res, next) => {
  const { BoughtHistoryId, prodId, count } = req.body;

  if (!Array.isArray(prodId)) {
    return res
      .status(401)
      .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
  }

  if (!Array.isArray(count)) {
    return res
      .status(401)
      .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
  }

  try {
    for (let i = 0; i < prodId.length; i++) {
      const exProd = await Product.findOne({
        where: { id: parseInt(prodId[i]) },
      });

      if (!exProd) {
        return res.status(401).send("존재하지 않는 상품입니다.");
      }

      await WishItem.create({
        count: parseInt(count[i]),
        ProductId: parseInt(prodId[i]),
        BoughtHistoryId: parseInt(BoughtHistoryId),
      });
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잠시후 다시 시도하여 주십시오.");
  }
});

router.post("/notUser/create", async (req, res, next) => {
  // 비회원 주문
  const {
    price,
    orderNum,
    name,
    receiverName,
    mobile,
    receiverMobile,
    email,
    zoneCode,
    address,
    detailAddress,
    deliveryMessage,
    payWay,
  } = req.body;

  try {
    const exBought = await BoughtHistory.findOne({
      where: { delPassword },
    });

    if (exBought) {
      return res
        .status(401)
        .send(
          "이미 존재하는 주문 비밀번호 입니다. 다른 주문 비밀번호를 입력 해주세요."
        );
    }

    const createResult = await BoughtHistory.create({
      type: "비회원주문",
      price,
      orderNum,
      name,
      receiverName,
      mobile,
      receiverMobile,
      email,
      zoneCode,
      address,
      detailAddress,
      deliveryMessage,
      payWay,
      UserId: null,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true, id: createResult.id });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 결제할 수 없습니다.");
  }
});

router.post("/notUser/wishcreate", async (req, res, next) => {
  const { BoughtHistoryId, prodId, count } = req.body;

  if (!Array.isArray(prodId)) {
    return res
      .status(401)
      .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
  }

  if (!Array.isArray(count)) {
    return res
      .status(401)
      .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
  }

  try {
    for (let i = 0; i < prodId.length; i++) {
      const exProd = await Product.findOne({
        where: { id: parseInt(prodId[i]) },
      });

      if (!exProd) {
        return res.status(401).send("존재하지 않는 상품입니다.");
      }

      await WishItem.create({
        count: parseInt(count[i]),
        ProductId: parseInt(prodId[i]),
        BoughtHistoryId: parseInt(BoughtHistoryId),
      });
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잠시후 다시 시도하여 주십시오.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, deliveryCom, deliveryNo } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exBought = await BoughtHistory.findOne({
      where: { id: parseInt(id) },
    });

    if (!exBought) {
      return res.status(401).send("존재하지 않는 결제내역 입니다.");
    }

    const updateResult = await BoughtHistory.update(
      {
        deliveryCom,
        deliveryNo,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제 정보를 수정할 수 없습니다.");
  }
});

module.exports = router;
