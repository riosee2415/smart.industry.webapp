const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Question } = require("../models");

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
            where: { isCompleted: false },
            //
          });
          break;
        case 2:
          questions = await Question.findAll({
            where: { isCompleted: true },
            //
          });
          break;
        case 3:
          questions = await Question.findAll({});
          break;
        default:
          break;
      }

      return res.status(200).json(questions);
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("문의 데이터를 가져올 수 없습니다. [CODE 036]");
    }
  }
);

router.post("/create", isLoggedIn, async (req, res, next) => {
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

router.delete("/delete/:questionId", isAdminCheck, async (req, res, next) => {
  const { questionId } = req.params;

  try {
    const exQuestion = await Question.findOne({
      where: { id: parseInt(questionId) },
    });

    if (!exQuestion) {
      return res.status(401).send("존재하지 않는 문의 입니다.");
    }

    await Question.destroy({
      where: { id: parseInt(questionId) },
    });

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의내용을 삭제할 수 없습니다. [CODE 036]");
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
