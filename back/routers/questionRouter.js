const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Question } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// QUESTION
router.get(
  ["/list/:listType", "/list"],
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
      let questions = [];

      switch (_listType) {
        case 1:
          questions = await Question.findAll({
            where: {
              isCompleted: false,
            },
            order: [["createdAt", "DESC"]],
          });
          break;
        case 2:
          questions = await Question.findAll({
            where: {
              isCompleted: true,
            },
            order: [["createdAt", "DESC"]],
          });
          break;

        case 3:
          questions = await Question.findAll({
            order: [["createdAt", "DESC"]],
          });
          break;
        default:
          break;
      }

      return res.status(200).json({ questions });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("문의 데이터를 가져올 수 없습니다. [CODE 036]");
    }
  }
);

router.get("/detail/:questionId", async (req, res, next) => {
  const { password } = req.query;
  const { questionId } = req.params;

  try {
    const exQuestion = await Question.findOne({
      where: { id: parseInt(questionId) },
    });

    if (!exQuestion) {
      return res.status(401).send("존재하지 않는 문의 입니다.");
    }

    if (exQuestion.password !== null) {
      if (!password) {
        return res.status(401).send("비밀번호를 입력해주세요.");
      }

      if (String(password) !== exQuestion.password) {
        return res.status(401).send("비밀번호가 일치하지 않습니다.");
      }
    }

    return res.status(200).json(exQuestion);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 정보를 불러올 수 없습니다.");
  }
});

router.get("/next/:questionId", isLoggedIn, async (req, res, next) => {
  const { questionId } = req.params;

  try {
    const questions = await Question.findAll({
      where: {
        id: {
          [Op.gt]: parseInt(questionId),
        },
        UserId: parseInt(req.user.id),
      },
      limit: 1,
    });

    if (!questions[0]) {
      return res.status(401).send("마지막 문의 입니다.");
    }

    return res.redirect(`/api/question/detail/${questions[0].id}`);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.get("/prev/:questionId", isLoggedIn, async (req, res, next) => {
  const { questionId } = req.params;

  try {
    const questions = await Question.findAll({
      where: {
        id: {
          [Op.lt]: parseInt(questionId),
        },
        UserId: parseInt(req.user.id),
      },
    });

    if (!questions[0]) {
      return res.status(401).send("첫번째 문의 입니다.");
    }

    return res.redirect(
      `/api/question/detail/${questions[questions.length - 1].id}`
    );
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.get("/myList", isLoggedIn, async (req, res, next) => {
  const { page } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const totalmyList = await Question.findAll({
      where: { UserId: parseInt(req.user.id) },
    });

    const questionLen = totalmyList.length;

    const lastPage =
      questionLen % LIMIT > 0 ? questionLen / LIMIT + 1 : questionLen / LIMIT;

    const myList = await Question.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: { UserId: parseInt(req.user.id) },
    });

    if (!myList) {
      return res.status(200).json([]);
    }

    return res.status(200).json({
      myList,
      lastPage: parseInt(lastPage),
      questionLen: parseInt(questionLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { author, mobile, email, title, content, term } = req.body;

  try {
    const createResult = await Question.create({
      author,
      mobile,
      email,
      title,
      content,
      term,
      UserId: parseInt(req.user.id),
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 생성할 수 없습니다. [CODE 037]");
  }
});

//  비회원 1대1 문의

router.post("/notUser/create", async (req, res, next) => {
  const { author, mobile, email, title, content, term, password } = req.body;

  try {
    const createResult = await Question.create({
      author,
      mobile,
      email,
      title,
      content,
      term,
      password,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 생성할 수 없습니다. [CODE 037]");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, answer } = req.body;

  try {
    const exQuestion = await Question.findOne({
      where: { id: parseInt(id) },
    });

    if (!exQuestion) {
      return res.status(401).send("존재하지 않는 문의 입니다.");
    }

    const updateResult = await Question.update(
      {
        answer,
        answerdAt: new Date(),
        isCompleted: true,
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
    return res.status(401).send("문의내용을 수정할 수 없습니다. [CODE 035]");
  }
});

module.exports = router;
