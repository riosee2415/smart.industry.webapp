const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { Review, Product } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  const { searchTitle, searchAuthor, page } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _searchTitle = searchTitle ? searchTitle : "";
  const _searchAuthor = searchAuthor ? searchAuthor : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalReview = await Review.findAll({
      where: {
        title: {
          [Op.like]: `%${_searchTitle}%`,
        },
        author: {
          [Op.like]: `%${_searchAuthor}%`,
        },
        isDelete: false,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    const reviewLen = totalReview.length;

    const lastPage =
      reviewLen % LIMIT > 0 ? reviewLen / LIMIT + 1 : reviewLen / LIMIT;

    const reviews = await Review.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        title: {
          [Op.like]: `%${_searchTitle}%`,
        },
        author: {
          [Op.like]: `%${_searchAuthor}%`,
        },
        isDelete: false,
      },
      include: [
        {
          model: Product,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ reviews, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기 목록을 불러올 수 없습니다.");
  }
});

router.get("/product/list", async (req, res, next) => {
  const { ProductId } = req.query;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(ProductId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const reviews = await Review.findAll({
      where: { ProductId: parseInt(ProductId), isDelete: false },
      include: [
        {
          model: Product,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기 목록을 불러올 수 없습니다.");
  }
});

router.post("/image", upload.single("image"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

router.post("/create", async (req, res, next) => {
  const { ProductId, title, author, imagePath, content } = req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(ProductId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const createResult = await Review.create({
      title,
      author,
      imagePath,
      content,
      ProductId: parseInt(ProductId),
      UserId: parseInt(req.user.id),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기를 작성할 수 없습니다.");
  }
});

router.post("/notUser/create", async (req, res, next) => {
  const { ProductId, title, author, imagePath, content } = req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(ProductId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const createResult = await Review.create({
      title,
      author,
      imagePath,
      content,
      ProductId: parseInt(ProductId),
      UserId: null,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기를 작성할 수 없습니다.");
  }
});

router.patch("/update", isLoggedIn, async (req, res, next) => {
  const { id, title, content } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const exReview = await Review.findOne({
      where: { id: parseInt(id) },
    });

    if (!exReview) {
      return res.status(401).send("존재하지 않는 후기입니다.");
    }

    if (req.user.id !== exReview.UserId) {
      return res
        .status(403)
        .send("자신이 작성하지 않은 후기는 수정할 수 없습니다.");
    }

    const updateResult = await Review.update(
      {
        title,
        content,
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
    return res.status(401).send("후기를 수정할 수 없습니다.");
  }
});

router.patch("/hit/update", async (req, res, next) => {
  const { id } = req.body;
  try {
    const exReview = await Review.findOne({
      where: { id: parseInt(id) },
    });

    if (!exReview) {
      return res.status(401).send("존재하지 않는 후기입니다.");
    }

    const nextHit = exReview.hit;

    const updateResult = await Review.update(
      {
        hit: nextHit + 1,
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
    return res.status(401).send("잠시 후 다시 시도하여 주십시오.");
  }
});

router.delete("/delete/:reviewId", isLoggedIn, async (req, res, next) => {
  const { reviewId } = req.params;

  if (isNanCheck(reviewId)) {
    return res.status(403).send("잘못된 요청입니다.");
  }
  try {
    const exReview = await Review.findOne({
      where: { id: parseInt(reviewId) },
    });

    if (!exReview) {
      return res.status(401).send("존재하지 않는 후기입니다.");
    }

    if (req.user.id !== exReview.UserId) {
      return res
        .status(403)
        .send("자신이 작성하지 않은 후기는 삭제할 수 없습니다.");
    }

    const deleteResult = await Review.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(reviewId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기를 삭제할 수 없습니다.");
  }
});

module.exports = router;
