const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { FaqType, Faq } = require("../models");
const { Op } = require("sequelize");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isNanCheck = require("../middlewares/isNanCheck");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// FAQ TYPES

router.get("/type/list", async (req, res, next) => {
  try {
    const lists = await FaqType.findAll({
      where: { isDelete: false },
      order: [["value", "ASC"]],
    });

    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  try {
    await FaqType.create({
      value,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 추가할 수 없습니다.");
  }
});

router.patch("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  if (isNanCheck(id)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  if (!value) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  try {
    await FaqType.update(
      {
        value,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 추가할 수 없습니다.");
  }
});

router.patch("/type/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  if (isNanCheck(id)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  try {
    await FaqType.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 삭제할 수 없습니다.");
  }
});

// FAQ

router.get(["/list", "/list/:typeId"], async (req, res, next) => {
  const { typeId } = req.params;
  const { search } = req.query;

  const _search = search ? search : "";

  try {
    if (typeId) {
      const lists = await Faq.findAll({
        where: {
          isDelete: false,
          FaqTypeId: parseInt(typeId),
          question: {
            [Op.like]: `%${_search}%`,
          },
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: FaqType,
            attributes: ["value", "isDelete"],
          },
        ],
      });

      return res.status(200).json(lists);
    } else {
      const lists = await Faq.findAll({
        where: {
          isDelete: false,
          question: {
            [Op.like]: `%${_search}%`,
          },
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: FaqType,
            attributes: ["value", "isDelete"],
          },
        ],
      });

      return res.status(200).json(lists);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { question, answer, typeId } = req.body;

  if (!question) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.[질문]");
  }

  if (!answer) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.[답변]");
  }

  if (isNanCheck(typeId)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.[유형]");
  }

  try {
    await Faq.create({
      question,
      answer,
      FaqTypeId: parseInt(typeId),
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 추가할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, question, answer, typeId } = req.body;

  if (isNanCheck(id)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  if (!question) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.[질문]");
  }

  if (!answer) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.[답변]");
  }

  if (isNanCheck(typeId)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.[유형]");
  }

  try {
    await Faq.update(
      {
        question,
        answer,
        FaqTypeId: parseInt(typeId),
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 추가할 수 없습니다.");
  }
});

router.patch("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  if (isNanCheck(id)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  try {
    await Faq.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 삭제할 수 없습니다.");
  }
});

module.exports = router;
