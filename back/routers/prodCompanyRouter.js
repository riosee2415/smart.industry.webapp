const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { ProdCompany } = require("../models");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  try {
    const lists = await ProdCompany.findAll({
      where: { isDelete: false },
      order: [["value", "ASC"]],
    });

    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    return res.status(400).send("제조사를 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  try {
    await ProdCompany.create({
      value,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("제조사를 추가할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  try {
    const exCom = await ProdCompany.findOne({
      where: { id: parseInt(id) },
    });

    if (!exCom) {
      return res.status(401).send("존재하지 않는 제조사 정보입니다.");
    }

    await ProdCompany.update(
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
    return res.status(400).send("제조사를 추가할 수 없습니다.");
  }
});

router.delete("/delete/:comId", isAdminCheck, async (req, res, next) => {
  const { comId } = req.params;

  if (isNanCheck(comId)) {
    return res.status(400).send("잘못된 요청 입니다. 다시 확인해주세요.");
  }

  try {
    const exCom = await ProdCompany.findOne({
      where: { id: parseInt(comId) },
    });

    if (!exCom) {
      return res.status(401).send("존재하지 않는 제조사 정보입니다.");
    }

    await ProdCompany.update(
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
    return res.status(400).send("제조사를 삭제할 수 없습니다.");
  }
});

module.exports = router;
