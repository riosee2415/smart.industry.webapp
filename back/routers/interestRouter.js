const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { Interest, Product } = require("../models");

const router = express.Router();

router.get("/list", isLoggedIn, async (req, res, next) => {
  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const interests = await Interest.findAll({
      where: { UserId: parseInt(req.user.id) },
      include: [
        {
          model: Product,
        },
      ],
    });

    return res.status(200).json(interests ? interests : []);
  } catch (error) {
    console.error(error);
    return res.status(401).send("관심 상품 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { ProductId } = req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(ProductId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const exInt = await Interest.findOne({
      where: { ProductId: parseInt(ProductId), UserId: parseInt(req.user.id) },
    });

    if (exInt) {
      return res.status(401).send("이미 관심 상품으로 등록되어 있습니다.");
    }

    const createResult = await Interest.create({
      ProductId: parseInt(ProductId),
      UserId: parseInt(req.user.id),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("관심 상품을 등록할 수 없습니다.");
  }
});

router.delete("/delete/:interId", isLoggedIn, async (req, res, next) => {
  const { interId } = req.params;

  if (isNanCheck(interId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 하실 수 있습니다.");
  }

  try {
    const exInt = await Interest.findOne({
      where: { id: parseInt(interId), UserId: parseInt(req.user.id) },
    });

    if (!exInt) {
      return res.status(401).send("존재하지 않는 관심 상품입니다.");
    }

    if (exInt.UserId !== req.user.id) {
      return res
        .status(401)
        .send("자신이 등록하지 않은 관심 상품은 삭제할 수 없습니다.");
    }

    const deleteResult = await Interest.destroy({
      where: { id: parseInt(interId) },
    });

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("관심 상품을 삭제할 수 없습니다.");
  }
});

module.exports = router;
