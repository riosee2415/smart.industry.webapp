const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { Product, BoughtHistory, WishItem } = require("../models");
const deliverySearch = require("../utils/deliverySearch");
const router = express.Router();
const axios = require("axios");

//////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// BOUGHT HISTORY 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
//////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

router.get("/list", isLoggedIn, async (req, res, next) => {
  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }
  try {
    const boughtHistorys = await BoughtHistory.findAll({
      where: { UserId: parseInt(req.user.id) },
      include: [
        {
          model: WishItem,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });

    const delivery = await deliverySearch(boughtHistorys);

    return res.status(200).json({
      boughtHistorys,
      delivery,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 목록을 불러올 수 없습니다.");
  }
});

router.get("/detail/:boughtId", isLoggedIn, async (req, res, next) => {
  const { boughtId } = req.params;

  if (isNanCheck(boughtId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const exBought = await BoughtHistory.findOne({
      where: { id: parseInt(boughtId) },
    });

    if (!exBought) {
      return res.status(401).send("존재하지 않는 결제내역 입니다.");
    }

    let boughtHistorys = [];

    boughtHistorys.push(
      await BoughtHistory.findOne({
        where: { id: parseInt(boughtId), UserId: parseInt(req.user.id) },
        include: [
          {
            model: WishItem,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      })
    );

    const delivery = await deliverySearch(boughtHistorys);

    return res.status(200).json({
      boughtHistorys,
      delivery,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 정보를 불러올 수 없습니다.");
  }
});

router.get(
  ["/admin/list", "/admin/list/:listType"],
  isAdminCheck,
  async (req, res, next) => {
    const { listType } = req.params;

    let nanFlag = isNaN(listType);

    if (!listType) {
      nanFlag = false;
    }

    if (nanFlag) {
      return res.status(400).send("잘못된 요청 입니다.");
    }

    let _listType = Number(listType);

    if (_listType > 3 || !listType) {
      _listType = 3;
    }

    try {
      let boughts = [];

      switch (_listType) {
        case 1:
          boughts = await BoughtHistory.findAll({
            where: { isCompleted: false },
            include: [
              {
                model: WishItem,
                include: [
                  {
                    model: Product,
                  },
                ],
              },
            ],
          });
          break;
        case 2:
          boughts = await BoughtHistory.findAll({
            where: { isCompleted: true },
            include: [
              {
                model: WishItem,
                include: [
                  {
                    model: Product,
                  },
                ],
              },
            ],
          });
          break;
        case 3:
          boughts = await BoughtHistory.findAll({
            include: [
              {
                model: WishItem,
                include: [
                  {
                    model: Product,
                  },
                ],
              },
            ],
          });
          break;
        default:
          break;
      }

      return res.status(200).json(boughts);
    } catch (error) {
      console.error(error);
      return res.status(401).send("견적서 정보를 불러올 수 없습니다.");
    }
  }
);

router.get("/admin/detail/:boughtId", isAdminCheck, async (req, res, next) => {
  const { boughtId } = req.params;

  if (isNanCheck(boughtId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exBought = await BoughtHistory.findOne({
      where: { id: parseInt(boughtId) },
    });

    if (!exBought) {
      return res.status(401).send("존재하지 않는 결제내역 입니다.");
    }

    let boughtHistorys = [];

    boughtHistorys.push(
      await BoughtHistory.findOne({
        where: { id: parseInt(boughtId) },
        include: [
          {
            model: WishItem,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      })
    );

    const delivery = await deliverySearch(boughtHistorys);

    return res.status(200).json({
      boughtHistorys,
      delivery,
    });
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
      delPassword: "-",
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

// prodId, count는 배열로 보내주세요 !
router.post("/user/wishcreate", isLoggedIn, async (req, res, next) => {
  const { BoughtHistoryId, prodId, count, orderDatum, name, mobile, content } =
    req.body;

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

      await axios({
        url: "https://alimtalk-api.bizmsg.kr/v2/sender/send",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          userid: process.env.BIZ_TALK_USERID,
        },
        data: [
          {
            profile: process.env.BIZ_TALK_PROFILE, // 발신프로필 키
            tmplId: "order",
            message_type: "AT",
            phn: "821049233908",
            msg: `대한기계공구 사이트에 상품문의가 접수 되었습니다!\n주문 내용 :\n${content}`,
            header: "",
            button1: {
              name: "사이트 바로가기",
              type: "WL",
              url_pc: "https://kor09.com/",
              url_mobile: "https://kor09.com/",
            },
            reserveDt: "00000000000000", // 발송시간
            items: {
              item: {
                list: [
                  {
                    title: "상품이름",
                    description: orderDatum[i].title,
                  },
                  {
                    title: "가격",
                    description: `${
                      (orderDatum[i].price -
                        orderDatum[i].price * (orderDatum[i].discount / 100)) *
                        orderDatum[i].productNum +
                      orderDatum[i].deliveryPay
                    }원`,
                  },
                  {
                    title: "개수",
                    description: `${orderDatum[i].productNum}개`,
                  },
                  {
                    title: "주문자",
                    description: `${name}님`,
                  },
                  {
                    title: "연락처",
                    description: mobile,
                  },
                ],
              },
              itemHighlight: {
                title: "대한기계공구",
                description: "상품문의가 접수 되었습니다.",
              },
            },
          },
        ],
      });
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잠시후 다시 시도하여 주십시오.");
  }
});

router.post("/notUser/list", async (req, res, next) => {
  const { delPassword } = req.body;

  try {
    if (delPassword === "-") {
      return res.status(401).send("올바른 주문 비밀번호를 입력하여 주십시오.");
    }

    let boughtArr = [];

    const notUserList = await BoughtHistory.findOne({
      where: {
        delPassword: delPassword,
      },
      include: [
        {
          model: WishItem,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });

    boughtArr.push(notUserList);

    if (!notUserList) {
      return res.status(401).send("일치하지 않는 주문 비밀번호 입니다.");
    }

    const delivery = await deliverySearch(boughtArr);

    return res.status(200).json({ notUserList, delivery });
  } catch (error) {
    console.error(error);
    return res.status(401).send("비회원 결제 목록을 불러올 수 없습니다.");
  }
});

router.post("/notUser/detail", async (req, res, next) => {
  const { delPassword } = req.body;

  try {
    const exBought = await BoughtHistory.findOne({
      where: { delPassword },
    });

    if (!exBought) {
      return res.status(401).send("주문 비밀번호를 잘못 입력하였습니다.");
    }

    let boughtHistorys = [];

    boughtHistorys.push(
      await BoughtHistory.findOne({
        where: {
          delPassword,
        },
        include: [
          {
            model: WishItem,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      })
    );

    const delivery = await deliverySearch(boughtHistorys);

    return res.status(200).json({
      boughtHistorys,
      delivery,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("견적서 정보를 불러올 수 없습니다.");
  }
});

router.post("/notUser/create", async (req, res, next) => {
  // 비회원 주문
  const {
    orderNum,
    price,
    discount,
    deliveryPrice,
    name,
    content,
    mobile,
    delPassword,
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
      orderNum,
      price,
      discount,
      deliveryPrice,
      delPassword,
      name,
      content,
      mobile,
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
  const { BoughtHistoryId, prodId, count, orderDatum, name, mobile, content } =
    req.body;

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

  if (!Array.isArray(orderDatum)) {
    return res
      .status(401)
      .send("잘못된 요청입니다. 확인 후 다시 시도하여 주십시오.");
  }

  try {
    for (let i = 0; i < orderDatum.length; i++) {
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

      await axios({
        url: "https://alimtalk-api.bizmsg.kr/v2/sender/send",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          userid: process.env.BIZ_TALK_USERID,
        },
        data: [
          {
            profile: process.env.BIZ_TALK_PROFILE, // 발신프로필 키
            tmplId: "order",
            message_type: "AT",
            phn: "821052667205",
            msg: `대한기계공구 사이트에 상품문의가 접수 되었습니다!\n주문 내용 :\n${content}`,
            header: "",
            button1: {
              name: "사이트 바로가기",
              type: "WL",
              url_pc: "https://kor09.com/",
              url_mobile: "https://kor09.com/",
            },
            reserveDt: "00000000000000", // 발송시간
            items: {
              item: {
                list: [
                  {
                    title: "상품이름",
                    description: orderDatum[i].title,
                  },
                  {
                    title: "가격",
                    description: `${
                      (orderDatum[i].price -
                        orderDatum[i].price * (orderDatum[i].discount / 100)) *
                        orderDatum[i].productNum +
                      orderDatum[i].deliveryPay
                    }원`,
                  },
                  {
                    title: "개수",
                    description: `${orderDatum[i].productNum}개`,
                  },
                  {
                    title: "주문자",
                    description: `${name}님`,
                  },
                  {
                    title: "연락처",
                    description: mobile,
                  },
                ],
              },
              itemHighlight: {
                title: "대한기계공구",
                description: "상품문의가 접수 되었습니다.",
              },
            },
          },
        ],
      });
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잠시후 다시 시도하여 주십시오.");
  }
});

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

router.patch("/delivery/update", isAdminCheck, async (req, res, next) => {
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

router.post("/orderTalk", async (req, res, next) => {
  const { content, title, price, count, author, mobile } = req.body;

  try {
    await axios({
      url: "https://alimtalk-api.bizmsg.kr/v2/sender/send",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        userid: "koentek1224",
      },
      data: [
        {
          profile: "288bcc889a4fc2b86f2e270061ce60ffbc6b867f", // 발신프로필 키
          tmplId: "order",
          message_type: "AT",
          phn: "821052667205",
          msg: `대한기계공구 사이트에 상품문의가 접수 되었습니다!\n주문 내용 :\n${content}`,
          header: "",
          button1: {
            name: "사이트 바로가기",
            type: "WL",
            url_pc: "https://kor09.com/",
            url_mobile: "https://kor09.com/",
          },
          reserveDt: "00000000000000", // 발송시간
          items: {
            item: {
              list: [
                {
                  title: "상품이름",
                  description: title,
                },
                {
                  title: "가격",
                  description: price,
                },
                {
                  title: "개수",
                  description: `${count}개`,
                },
                {
                  title: "주문자",
                  description: `${author}님`,
                },
                {
                  title: "연락처",
                  description: mobile,
                },
              ],
            },
            itemHighlight: {
              title: "대한기계공구",
              description: "상품문의가 접수 되었습니다.",
            },
          },
        },
      ],
    });

    return res.status(200).json({ result: true });
  } catch (e) {
    return res.status(400).send("알림톡을 전송할 수 없습니다.");
  }
});

module.exports = router;
