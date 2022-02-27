const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { ProdQuestion, Product } = require("../models");
const { Op } = require("sequelize");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const { listType, searchTitle, searchAuthor, page } = req.body;

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

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const _searchTitle = searchTitle ? searchTitle : "";
  const _searchAuthor = searchAuthor ? searchAuthor : "";

  try {
    let questions = [];
    let totalQuestions = [];
    let questionLen = 0;
    let lastPage = 0;

    switch (_listType) {
      case 1:
        totalQuestions = await ProdQuestion.findAll({
          where: {
            isComplete: false,
            title: {
              [Op.like]: `%${_searchTitle}%`,
            },
            author: {
              [Op.like]: `%${_searchAuthor}%`,
            },
          },
          include: [
            {
              model: Product,
            },
          ],
        });

        questionLen = totalQuestions.length;

        lastPage =
          questionLen % LIMIT > 0
            ? questionLen / LIMIT + 1
            : questionLen / LIMIT;

        questions = await ProdQuestion.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            isComplete: false,
            title: {
              [Op.like]: `%${_searchTitle}%`,
            },
            author: {
              [Op.like]: `%${_searchAuthor}%`,
            },
          },
          include: [
            {
              model: Product,
            },
          ],
          //
        });
        break;
      case 2:
        totalQuestions = await ProdQuestion.findAll({
          where: {
            isComplete: true,
            title: {
              [Op.like]: `%${_searchTitle}%`,
            },
            author: {
              [Op.like]: `%${_searchAuthor}%`,
            },
          },
          include: [
            {
              model: Product,
            },
          ],
        });

        questionLen = totalQuestions.length;

        lastPage =
          questionLen % LIMIT > 0
            ? questionLen / LIMIT + 1
            : questionLen / LIMIT;

        questions = await ProdQuestion.findAll({
          where: {
            isComplete: true,
            title: {
              [Op.like]: `%${_searchTitle}%`,
            },
            author: {
              [Op.like]: `%${_searchAuthor}%`,
            },
          },
          include: [
            {
              model: Product,
            },
          ],
          //
        });
        break;
      case 3:
        totalQuestions = await ProdQuestion.findAll({
          where: {
            title: {
              [Op.like]: `%${_searchTitle}%`,
            },
            author: {
              [Op.like]: `%${_searchAuthor}%`,
            },
          },
          include: [
            {
              model: Product,
            },
          ],
        });

        questionLen = totalQuestions.length;

        lastPage =
          questionLen % LIMIT > 0
            ? questionLen / LIMIT + 1
            : questionLen / LIMIT;

        questions = await ProdQuestion.findAll({
          where: {
            title: {
              [Op.like]: `%${_searchTitle}%`,
            },
            author: {
              [Op.like]: `%${_searchAuthor}%`,
            },
          },
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

    return res.status(200).json({
      questions,
      lastPage: parseInt(lastPage),
      questionLen: parseInt(questionLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의 목록을 불러올 수 없습니다.");
  }
});

router.get("/product/list/:ProductId", async (req, res, next) => {
  const { ProductId } = req.params;
  const { page } = req.query;

  const LIMIT = 8;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 8;

  if (isNanCheck(ProductId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(ProductId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const totalLists = await ProdQuestion.findAll({
      where: { ProductId: parseInt(ProductId) },
    });

    const questionLen = totalLists.length;

    const lastPage =
      questionLen % LIMIT > 0 ? questionLen / LIMIT + 1 : questionLen / LIMIT;

    const questions = await ProdQuestion.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: { ProductId: parseInt(ProductId) },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      questions,
      lastPage: parseInt(lastPage),
      questionLen: parseInt(questionLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의 목록을 불러올 수 없습니다.");
  }
});

router.get("/myList", isLoggedIn, async (req, res, next) => {
  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const questions = await ProdQuestion.findAll({
      where: {
        UserId: parseInt(req.user.id),
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!questions) {
      return res.status(200).json([]);
    }

    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(401).send("내가 작성한 상품 문의를 불러올 수 없습니다.");
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
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { author, mobile, email, title, content, isSecret, secret, ProductId } =
    req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

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
      UserId: parseInt(req.user.id),
      terms: null,
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

router.post("/notUser/create", async (req, res, next) => {
  const {
    author,
    mobile,
    email,
    title,
    content,
    isSecret,
    secret,
    ProductId,
    terms,
  } = req.body;

  if (!terms) {
    return res.status(401).send("약관에 동의해주세요.");
  }
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
      UserId: null,
      terms,
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
