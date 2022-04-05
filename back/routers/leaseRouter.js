const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { Lease } = require("../models");
const models = require("../models");
const axios = require("axios");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const {
    page,
    type,
    listType,
    date,
    searchTitle,
    searchAuthor,
    searchContent,
  } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  let _type = type || null;
  let _searchTitle = searchTitle || "";
  let _searchAuthor = searchAuthor || "";
  let _searchContent = searchContent || "";

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

  if (parseInt(date) > 3) {
    date === ``;
  }

  const searchDate =
    date === "1"
      ? ``
      : date === "2"
      ? `AND  createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -1  WEEK ) AND NOW()`
      : date === "3"
      ? `AND  createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -1  MONTH ) AND NOW()`
      : ``;

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
            isCompleted,
            DATE_FORMAT(createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            answerdAt
      FROM  leases
     WHERE  1 = 1
       AND  isDelete = FALSE
       AND  (
                  title  LIKE "%${_searchTitle}%"
                         AND
                  author LIKE "%${_searchAuthor}%"
                         AND
                  content LIKE "%${_searchContent}%"
            )
 ${_type ? `AND  type = '${_type}'` : ``}
 ${
   _listType === 1
     ? `AND isCompleted = false`
     : _listType === 2
     ? `AND isCompleted = true`
     : _listType === 3
     ? ``
     : ``
 }
 ${searchDate}
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
            isCompleted,
            DATE_FORMAT(createdAt,     "%Y년 %m월 %d일 %H시 %i분")							    AS	createdAt,
            DATE_FORMAT(updatedAt,     "%Y년 %m월 %d일 %H시 %i분") 					      		AS	updatedAt,
            answerdAt
      FROM  leases
     WHERE  1 = 1
       AND  isDelete = FALSE
       AND  (
              title  LIKE "%${_searchTitle}%"
                    AND
              author LIKE "%${_searchAuthor}%"
                    AND
              content LIKE "%${_searchContent}%"
            )
  ${_type ? `AND  type = '${_type}'` : ``} 
  ${
    _listType === 1
      ? `AND isCompleted = false`
      : _listType === 2
      ? `AND isCompleted = true`
      : _listType === 3
      ? ``
      : ``
  }
  ${searchDate}
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

router.get("/detail/:leaseId", async (req, res, next) => {
  const { leaseId } = req.params;

  if (isNanCheck(leaseId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exLease = await Lease.findOne({
      where: { id: parseInt(leaseId), isDelete: false },
    });

    if (!exLease) {
      return res.status(401).send("존재하지 않는 문의입니다.");
    }

    const nextHit = exLease.hit;

    await Lease.update(
      {
        hit: nextHit + 1,
      },
      {
        where: { id: parseInt(leaseId) },
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

    await axios({
      url: "https://alimtalk-api.bizmsg.kr/v2/sender/send",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        userid: process.env.BIZ_TALK_USERID,
      },
      data: [
        {
          profile: process.env.BIZ_TALK_PROFILE, // 발신프로필 키
          tmplId: "question",
          message_type: "AT",
          phn: "821052667205",
          msg: `대한기계공구 사이트에 문의가 접수되었습니다!\n문의 내용 :\n${content}`,
          header: "",
          button1: {
            name: "사이트 바로가기",
            type: "WL",
            url_pc: "https://kor09.com/",
            url_mobile: "https://kor09.com/",
          },
          reserveDt: "00000000000000", // 발송시간
          items: {
            item: {
              list: [
                {
                  title: "문의유형",
                  description: type,
                },
                {
                  title: "제목",
                  description: title,
                },
                {
                  title: "작성자",
                  description: author,
                },
                {
                  title: "이메일",
                  description: email,
                },
              ],
            },
            itemHighlight: {
              title: "대한기계공구",
              description: "문의가 접수 되었습니다.",
            },
          },
        },
      ],
    });

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
router.delete("/delete/:leaseId", isAdminCheck, async (req, res, next) => {
  const { leaseId } = req.params;

  if (isNanCheck(leaseId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exLease = await Lease.findOne({
      where: { id: parseInt(leaseId) },
    });

    if (!exLease) {
      return res.status(401).send("존재하지 않는 문의입니다.");
    }

    const deleteResult = await Lease.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(leaseId) },
      }
    );

    if (deleteResult[0] > 0) {
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
