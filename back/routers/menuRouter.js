const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { Menu } = require("../models");
const models = require("../models");

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

const router = express.Router();

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.get("/list", async (req, res, next) => {
  try {
    const selectQuery = `
    SELECT	id,
            value,
            imagePath
      FROM	menus
     WHERE	1 = 1
       AND	isDelete  = FALSE
     ORDER  BY createdAt DESC
   `;

    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json({ lists: lists[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("메뉴를 불러올 수 없습니다.");
  }
});

// 해당 메뉴 별 카테고리 조회
router.get("/catInMenu/:menuId", async (req, res, next) => {
  const { menuId } = req.params;
  try {
    const selectQuery = `
    SELECT	id,
            value,
            isDelete,
            MenuId
     FROM	  categorys
    WHERE	  1 = 1
      AND	  isDelete = FALSE
      AND   MenuId = ${menuId}
    ORDER   BY createdAt DESC
    `;

    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json({ lists: lists[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("메뉴를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { value, imagePath } = req.body;
  try {
    if (req.body.sort < 0) {
      return res.status(401).send("0보다 작은 수를 입력할 수 없습니다.");
    }

    const createResult = await Menu.create({
      value,
      imagePath,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("메뉴를 추가할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, value, imagePath } = req.body;
  try {
    const exMenu = await Menu.findOne({
      where: { id: parseInt(id) },
    });

    if (!exMenu) {
      return res.status(401).send("존재하지 않는 메뉴입니다.");
    }

    const updateResult = await Menu.update(
      {
        value,
        imagePath,
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
    return res.status(401).send("메뉴를 추가할 수 없습니다.");
  }
});

router.delete("/delete/:menuId", isAdminCheck, async (req, res, next) => {
  const { menuId } = req.params;

  if (isNanCheck(menuId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exMenu = await Menu.findOne({
      where: { id: parseInt(menuId) },
    });

    if (!exMenu) {
      return res.status(401).send("존재하지 않는 메뉴입니다.");
    }

    const deleteResult = await Menu.update(
      {
        isDelete: true,
        deletedAt: new Date(),
      },
      {
        where: { id: parseInt(menuId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("메뉴를 삭제할 수 없습니다.");
  }
});

module.exports = router;
