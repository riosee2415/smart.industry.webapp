const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { Lease } = require("../models");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  const {
    page,
    // type
  } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  // let _type = type || null;

  try {
    const lengthQuery = `
    SELECT  A.id,
            A.type,
            A.title,
            A.author,
            A.content,
            A.hit,
            A.email,
            A.secret,
            A.answer,
            DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            A.answerdAt
      FROM  leases
    `;

    const selectQuery = `
    SELECT  A.id,
            A.type,
            A.title,
            A.author,
            A.content,
            A.hit,
            A.email,
            A.secret,
            A.answer,
            DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            A.answerdAt
      FROM  leases
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);

    const lists = await models.sequelize.query(selectQuery);

    const leaseLen = length[0].length;

    const lastPage =
      leaseLen % LIMIT > 0 ? leaseLen / LIMIT + 1 : leaseLen / LIMIT;

    return res.status(200).json({
      lists: lists[0],
      lastPage: parseInt(lastPage),
      leaseLen: parseInt(leaseLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의를 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const { type, title, author, content, email, secret } = req.body;
  try {
    const createResult = await Lease.create({
      type,
      title,
      author,
      content,
      email,
      secret,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의를 작성할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, answer } = req.body;
  try {
    const exLease = await Lease.findOne({
      where: { id: parseInt(id) },
    });

    if (!exLease) {
      return res.status(401).send("존재하지 않는 문의입니다.");
    }

    const updateResult = await Lease.update(
      {
        isCompleted: true,
        answer,
        answerdAt: new Date(),
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
    return res.status(401).send("문의를 처리할 수 없습니다.");
  }
});

module.exports = router;
