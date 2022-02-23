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

router.get("/list", isAdminCheck, async (req, res, next) => {
  const { page } = req.params;
  try {
    const lengthQuery = `
    SELECT	A.id																		                            AS	wishId,
            A.count,
            A.ProductId,
            A.BoughtHistoryId,
            B.price,
            B.orderNum,
            B.name,
            B.mobile,
            B.email,
            B.payWay,
            B.deliveryCom,
            B.deliveryNo,
            B.isCompleted,
            B.isCancel,
            DATE_FORMAT(B.completedAt,   "%Y년 %m월 %d일 %H시 %i분")						  AS	completedAt,
            DATE_FORMAT(B.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							AS	createdAt,
            DATE_FORMAT(B.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					    AS	updatedAt,
            B.UserId																	                         AS  userId,
            C.id																		                           AS  productId,
            C.thumbnail,
            C.title,
            C.price,
            C.discount,
            D.value 																	                         AS  productTypeValue
      FROM	wishItems			A
     INNER
      JOIN	boughtHistorys 		B
        ON	A.BoughtHistoryId = B.id
     INNER 
      JOIN	products 			C
        ON	A.ProductId = C.id 
     INNER 
      JOIN 	productTypes 		D
        ON	C.ProductTypeId = D.id 
     WHERE  B.UserId = ${req.user.id}
    `;
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 목록을 불러올 수 없습니다.");
  }
});

router.get("/detail/:boughtId", async (req, res, next) => {
  const { boughtId } = req.params;
  try {
    const boughtQuery = `
      SELECT  id,
              orderNum,
              price,
              discount,
              deliveryPrice,
              name,
              content,
              mobile,
              deliveryCom,
              deliveryNo,
              isCompleted,
              DATE_FORMAT(B.completedAt,   "%Y년 %m월 %d일 %H시 %i분")						  AS	completedAt,
              DATE_FORMAT(B.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							AS	createdAt,
              DATE_FORMAT(B.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					    AS	updatedAt
        FROM  boughtHistorys
       WHERE  id = ${boughtId}
    `;

    const boughtItemQuery = `
      SELECT  A.id,
              A.count
              A.BoughtHistoryId,
              A.ProductId,
              B.thumbnail,
              B.price,
              B.discount
        FROM  wishItems             A
       INNER
        JOIN  prouductId            B
          ON  A.ProductId = B.id
    `;

    const list = await models.sequelize.query(boughtQuery);

    const boughtItems = await models.sequelize.query(boughtItemQuery);
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 정보를 불러올 수 없습니다.");
  }
});

router.get("/admin/list", async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 정보를 불러올 수 없습니다.");
  }
});

router.get("/admin/detail/:boughtId", async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 정보를 불러올 수 없습니다.");
  }
});

router.post("/user/create", isLoggedIn, async (req, res, next) => {
  const { orderNum, price, discount, deliveryPrice, name, content, mobile } =
    req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const createResult = await BoughtHistory.create({
      type: "회원주문",
      orderNum,
      price,
      discount,
      deliveryPrice,
      name,
      content,
      mobile,
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

// router.post("/notUser/create", async (req, res, next) => {
//   // 비회원 주문
//   const { orderNum, price, discount, deliveryPrice, name, content, mobile } =
//     req.body;

//   try {
//     const exBought = await BoughtHistory.findOne({
//       where: { delPassword },
//     });

//     if (exBought) {
//       return res
//         .status(401)
//         .send(
//           "이미 존재하는 주문 비밀번호 입니다. 다른 주문 비밀번호를 입력 해주세요."
//         );
//     }

//     const createResult = await BoughtHistory.create({
//       type: "비회원주문",
//       orderNum,
//       price,
//       discount,
//       deliveryPrice,
//       name,
//       content,
//       mobile,
//       UserId: null,
//     });

//     if (!createResult) {
//       return res.status(401).send("처리중 문제가 발생하였습니다.");
//     }

//     return res.status(201).json({ result: true, id: createResult.id });
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send("상품을 결제할 수 없습니다.");
//   }
// });

// router.post("/notUser/wishcreate", async (req, res, next) => {
//   const { BoughtHistoryId, prodId, count } = req.body;

//   if (!Array.isArray(prodId)) {
//     return res
//       .status(401)
//       .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
//   }

//   if (!Array.isArray(count)) {
//     return res
//       .status(401)
//       .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
//   }

//   try {
//     for (let i = 0; i < prodId.length; i++) {
//       const exProd = await Product.findOne({
//         where: { id: parseInt(prodId[i]) },
//       });

//       if (!exProd) {
//         return res.status(401).send("존재하지 않는 상품입니다.");
//       }

//       await WishItem.create({
//         count: parseInt(count[i]),
//         ProductId: parseInt(prodId[i]),
//         BoughtHistoryId: parseInt(BoughtHistoryId),
//       });
//     }

//     return res.status(201).json({ result: true });
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send("잠시후 다시 시도하여 주십시오.");
//   }
// });

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

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
        isCompleted: true,
        completedAt: new Date(),
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

router.patch("/delivey/update", isAdminCheck, async (req, res, next) => {
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
