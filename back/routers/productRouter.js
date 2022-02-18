const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { Category, Menu } = require("../models");
const models = require("../models");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

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

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.get("/cat/list", async (req, res, next) => {
  try {
    const selectQuery = `
    SELECT	A.id,
            A.value,
            A.isDelete,
            DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            A.MenuId,
            B.value 																		    AS	menuValue,
            B.isShow
    FROM	categorys				A
   INNER
    JOIN	menus 					B
      ON	A.MenuId = B.id
   WHERE	1 = 1
     AND	A.isDelete = FALSE
     AND	B.isDelete = FALSE
     AND	B.isShow = TRUE
      `;

    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json({ lists: lists[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("유형 목록을 불러올 수 없습니다");
  }
});

router.post("/cat/create", isAdminCheck, async (req, res, next) => {
  const { value, MenuId } = req.body;
  try {
    const exCat = await Category.findOne({
      where: { value },
    });

    if (exCat) {
      return res.status(401).send("이미 존재하는 유형입니다.");
    }

    const exMenu = await Menu.findOne({
      where: { id: parseInt(MenuId) },
    });

    if (!exMenu) {
      return res.status(401).send("존재하지 않는 메뉴입니다.");
    }

    const createResult = await Category.create({
      value,
      MenuId: parseInt(MenuId),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("유형을 추가할 수 없습니다");
  }
});

router.patch("/cat/update", isAdminCheck, async (req, res, next) => {
  const { id, value, MenuId } = req.body;
  try {
    const exCat = await Category.findOne({
      where: { id: parseInt(id) },
    });

    if (!exCat) {
      return res.status(401).send("존재하지 않는 유형입니다.");
    }

    const exMenu = await Menu.findOne({
      where: { id: parseInt(MenuId) },
    });

    if (!exMenu) {
      return res.status(401).send("존재하지 않는 메뉴입니다.");
    }

    const updateResult = await Category.update(
      {
        value,
        MenuId: parseInt(MenuId),
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
    return res.status(401).send("유형을 수정할 수 없습니다");
  }
});

router.delete("/cat/:catId", isAdminCheck, async (req, res, next) => {
  const { catId } = req.params;

  if (isNanCheck(catId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exCat = await Category.findOne({
      where: { id: parseInt(catId) },
    });

    if (!exCat) {
      return res.status(401).send("존재하지 않는 유형입니다.");
    }

    const deleteResult = await Category.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(catId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("유형을 삭제할 수 없습니다");
  }
});

router.post("/list", async (req, res, next) => {
  const { categoryId, isUsed, isSale, isPrice, isName } = req.body;

  let _categoryId = categoryId || null;
  let _isUsed = isUsed || null;
  let _isSale = isSale || null;
  let _isPrice = isPrice || null;
  let _isName = isName || null;

  let orderName = `A.createdAt`;
  let orderSc = `DESC`;

  if (_isPrice === 1) {
    orderName = `A.price`;
    orderSc = `ASC`;
  }

  if (_isPrice === 2) {
    orderName = `A.price`;
    orderSc = `DESC`;
  }

  if (_isName) {
    orderName = `A.title`;
    orderSc = `ASC`;
  }

  try {
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 불러올 수 없습니다.");
  }
});
module.exports = router;
