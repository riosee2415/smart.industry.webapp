const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { Category, Menu, ProductImage, Product } = require("../models");
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
            B.value 																		    AS	menuValue
    FROM	categorys				A
   INNER
    JOIN	menus 					B
      ON	A.MenuId = B.id
   WHERE	1 = 1
     AND	A.isDelete = FALSE
     AND	B.isDelete = FALSE
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
  const { categoryId, isUsed, isSale, isPrice, isName, page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

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
    const lengthQuery = `
    SELECT	A.id,
            A.thumbnail,
            A.title,
            A.youtubeLink,
            A.price,
            A.discount,
            A.deliveryPay,
            DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            A.CategoryId,
            A.isDelete,
            A.isUsed,
            A.isSale,
            B.value,
            B.MenuId,
            C.imagePath
    FROM	products 				A
   INNER
    JOIN	categorys 				B
      ON	A.CategoryId = B.id
   INNER
    JOIN	menus					C
      ON	B.MenuId = C.id
   WHERE	1 = 1
     AND    A.isDelete = FALSE
     ${_categoryId ? `AND A.CategoryId = ${_categoryId}` : ``}    
     ${_isUsed ? `AND A.isUsed = TRUE` : ``}    
     ${_isSale ? `AND A.isSale = TRUE` : ``}    
    `;

    const selectQuery = `
    SELECT	A.id,
            A.thumbnail,
            A.title,
            A.youtubeLink,
            A.price,
            A.discount,
            A.deliveryPay,
            DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            A.CategoryId,
            A.isDelete,
            A.isUsed,
            A.isSale,
            B.value,
            B.MenuId,
            C.imagePath
    FROM	products 				A
   INNER
    JOIN	categorys 				B
      ON	A.CategoryId = B.id
   INNER
    JOIN	menus					C
      ON	B.MenuId = C.id
   WHERE	1 = 1
     AND    A.isDelete = FALSE
     ${_categoryId ? `AND A.CategoryId = ${_categoryId}` : ``}    
     ${_isUsed ? `AND A.isUsed = TRUE` : ``}    
     ${_isSale ? `AND A.isSale = TRUE` : ``}
   ORDER    BY  ${orderName} ${orderSc}
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}  
    `;

    const length = await models.sequelize.query(lengthQuery);

    const lists = await models.sequelize.query(selectQuery);

    const noticeLen = length[0].length;

    const lastPage =
      noticeLen % LIMIT > 0 ? noticeLen / LIMIT + 1 : noticeLen / LIMIT;

    return res.status(200).json({
      lists: lists[0],
      lastPage: parseInt(lastPage),
      noticeLen: parseInt(noticeLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 불러올 수 없습니다.");
  }
});

router.get("/detail/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(productId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const selectQuery = `
    SELECT	A.id,
            A.thumbnail,
            A.title,
            A.youtubeLink,
            A.price,
            A.discount,
            A.deliveryPay,
            DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            A.CategoryId,
            A.isDelete,
            A.isUsed,
            A.isSale,
            B.value,
            B.MenuId,
            C.imagePath
    FROM	products 				A
   INNER
    JOIN	categorys 				B
      ON	A.CategoryId = B.id
   INNER
    JOIN	menus					C
      ON	B.MenuId = C.id
   WHERE	1 = 1
     AND    A.isDelete = FALSE
     AND    A.id = ${productId}
    `;

    const imageQuery = `
    SELECT	A.id,
            A.imagePath,
            A.ProductId,
            B.title
    FROM	productImages		A
   INNER
    JOIN	products 			B
      ON	A.ProductId = B.id
   WHERE    A.ProductId = ${productId}
    `;

    const lists = await models.sequelize.query(selectQuery);

    const images = await models.sequelize.query(imageQuery);

    return res.status(200).json({
      lists: lists[0],
      images: images[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 정보를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const {
    thumbnail,
    title,
    youtubeLink,
    price,
    discount,
    deliveryPay,
    isUsed,
    isSale,
    CategoryId,
  } = req.body;
  try {
    const exCategory = await Category.findOne({
      where: { id: parseInt(CategoryId) },
    });

    if (!exCategory) {
      return res.status(401).send("존재하지 않는 유형입니다.");
    }

    const createResult = await Product.create({
      thumbnail,
      title,
      youtubeLink,
      price,
      discount,
      deliveryPay,
      isUsed,
      isSale,
      CategoryId: parseInt(CategoryId),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true, id: createResult.id });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 추가할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const {
    id,
    thumbnail,
    title,
    youtubeLink,
    price,
    discount,
    deliveryPay,
    isUsed,
    isSale,
    CategoryId,
  } = req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(id) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const exCategory = await Category.findOne({
      where: { id: parseInt(CategoryId) },
    });

    if (!exCategory) {
      return res.status(401).send("존재하지 않는 유형입니다.");
    }

    const updateResult = await Product.update(
      {
        thumbnail,
        title,
        youtubeLink,
        price,
        discount,
        deliveryPay,
        isUsed,
        isSale,
        CategoryId: parseInt(CategoryId),
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
    return res.status(401).send("상품을 수정할 수 없습니다.");
  }
});

router.delete("/delete/:productId", isAdminCheck, async (req, res, next) => {
  const { productId } = req.params;

  if (isNanCheck(productId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(productId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const deleteResult = await Product.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(productId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 삭제할 수 없습니다.");
  }
});

router.post("/image/list", async (req, res, next) => {
  const { prodId } = req.body;
  try {
    const lists = await ProductImage.findAll({
      where: {
        isDelete: false,
        ProductId: parseInt(prodId),
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    return res.status(200).json(lists ? lists : []);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 이미지를 불러올 수 없습니다.");
  }
});

router.post("/image/create", isAdminCheck, async (req, res, next) => {
  const { imagePath, prodId } = req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(prodId) },
    });

    if (!exProd) {
      return res
        .status(401)
        .send("존재하지 않는 상품입니다. 확인 후 다시 시도하여 주십시오.");
    }

    const createResult = await ProductImage.create({
      imagePath,
      ProductId: parseInt(prodId),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 이미지를 추가할 수 없습니다.");
  }
});

router.patch("/image/update", isAdminCheck, async (req, res, next) => {
  const { id, imagePath } = req.body;
  try {
    const exImage = await ProductImage.findOne({
      where: { id: parseInt(id) },
    });

    if (!exImage) {
      return res.status(401).send("존재하지 않는 상품이미지 입니다.");
    }

    const updateResult = await ProductImage.update(
      {
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
    return res.status(401).send("상품 이미지를 수정할 수 없습니다.");
  }
});

router.delete(
  "/image/delete/:imageId",
  isAdminCheck,
  async (req, res, next) => {
    const { imageId } = req.params;

    if (isNanCheck(imageId)) {
      return res.status(401).send("잘못된 요청입니다.");
    }

    try {
      const exImage = await ProductImage.findOne({
        where: { id: parseInt(imageId) },
      });

      if (!exImage) {
        return res.status(401).send("존재하지 않는 상품이미지 입니다.");
      }

      const deleteResult = await ProductImage.update(
        {
          isDelete: true,
        },
        {
          where: { id: parseInt(imageId) },
        }
      );

      if (deleteResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).send("상품 이미지를 삭제할 수 없습니다.");
    }
  }
);
module.exports = router;
