const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { ProdQuestion, Product } = require("../models");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const { listType, ProductId } = req.body;

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
    let questions = [];

    switch (_listType) {
      case 1:
        questions = await ProdQuestion.findAll({
          where: { isComplete: false, ProductId: parseInt(ProductId) },
          include: [
            {
              model: Product,
            },
          ],
          //
        });
        break;
      case 2:
        questions = await ProdQuestion.findAll({
          where: { isComplete: true, ProductId: parseInt(ProductId) },
          include: [
            {
              model: Product,
            },
          ],
          //
        });
        break;
      case 3:
        questions = await ProdQuestion.findAll({
          ProductId: parseInt(ProductId),
          include: [
            {
              model: Product,
            },
          ],
        });
        break;
      default:
        break;
    }

    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의 목록을 불러올 수 없습니다.");
  }
});

router.post("/admin/list", async (req, res, next) => {
  const { listType } = req.body;

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
    let questions = [];

    switch (_listType) {
      case 1:
        questions = await ProdQuestion.findAll({
          where: { isComplete: false },
          include: [
            {
              model: Product,
            },
          ],
          //
        });
        break;
      case 2:
        questions = await ProdQuestion.findAll({
          where: { isComplete: true },
          include: [
            {
              model: Product,
            },
          ],
          //
        });
        break;
      case 3:
        questions = await ProdQuestion.findAll({
          include: [
            {
              model: Product,
            },
          ],
        });
        break;
      default:
        break;
    }

    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의 목록을 불러올 수 없습니다.");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id, secret } = req.body;
  try {
    const exQue = await ProdQuestion.findOne({
      where: { id: parseInt(id) },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!exQue) {
      return res.status(401).send("존재하지 않는 문의입니다.");
    }

    const nextHit = exQue.hit;

    if (exQue.isSecret === true) {
      if (String(secret) !== exQue.secret) {
        return res.status(401).send("비밀번호가 일치하지 않습니다.");
      }

      await ProdQuestion.update(
        {
          hit: nextHit + 1,
        },
        {
          where: { id: parseInt(id) },
        }
      );

      return res.status(200).json(exQue);
    }

    await ProdQuestion.update(
      {
        hit: nextHit + 1,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json(exQue);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의 목록을 불러올 수 없습니다.");
  }
});

// 프론트에서 비밀글 설정 체크 했을 땐 무조건 secret을 입력해야하고,
// 체크 안했을 땐 무조건 null을 넘겨줘야한다.
router.post("/create", async (req, res, next) => {
  const { author, mobile, email, title, content, isSecret, secret, ProductId } =
    req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(ProductId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const createResult = await ProdQuestion.create({
      author,
      mobile,
      email,
      title,
      content,
      isSecret,
      secret: Boolean(isSecret) === true ? secret : null,
      ProductId: parseInt(ProductId),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의를 작성할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, answer } = req.body;
  try {
    const exQue = await ProdQuestion.findOne({
      where: { id: parseInt(id) },
    });

    if (!exQue) {
      return res.status(401).send("존재하지 않는 문의입니다.");
    }

    const updateResult = await ProdQuestion.update(
      {
        isComplete: true,
        answer,
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
    return res.status(401).send("상품 문의를 처리할 수 없습니다.");
  }
});

module.exports = router;
