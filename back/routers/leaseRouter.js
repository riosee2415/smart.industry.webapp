const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { Lease } = require("../models");
const models = require("../models");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const { page, type, isCompleted } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  let _type = type || null;
  let _isCompleted = isCompleted || null;

  try {
    const lengthQuery = `
    SELECT  id,
            type,
            title,
            author,
            content,
            hit,
            email,
            secret,
            answer,
            DATE_FORMAT(createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            answerdAt
      FROM  leases
     WHERE  1 = 1
 ${_type ? `AND  type = '${_type}'` : ``}
 ${_isCompleted ? `AND  isCompleted = ${_isCompleted}` : ``}
    `;

    const selectQuery = `
    SELECT  id,
            type,
            title,
            author,
            content,
            hit,
            email,
            secret,
            answer,
            DATE_FORMAT(createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            answerdAt
      FROM  leases
     WHERE  1 = 1
  ${_type ? `AND  type = '${_type}'` : ``} 
  ${_isCompleted ? `AND isCompleted = ${_isCompleted}` : ``}
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

router.post("/detail", async (req, res, next) => {
  const { id, secret } = req.body;
  try {
    const exLease = await Lease.findOne({
      where: { id: parseInt(id) },
    });

    if (!exLease) {
      return res.status(401).send("존재하지 않는 문의입니다.");
    }

    if (!secret) {
      return res.status(401).send("비밀번호를 입력하여 주세요.");
    }

    const nextHit = exLease.hit;

    if (String(secret) !== exLease.secret) {
      return res.status(401).send("비밀번호가 일치하지 않습니다.");
    }

    await Lease.update(
      {
        hit: nextHit + 1,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json(exLease);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 정보를 불러올 수 없습니다.");
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
