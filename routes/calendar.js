const express = require("express");
const { isLoggedIn } = require("./middlewares");
const { Date, Cycle } = require("../models");
const router = express.Router();

//캘린더 디테일 페이지 post
//로그인한 사용자의 id는 req.user.id로 가져올 수 있다
router.post("/api/main/date", isLoggedIn, async (req, res) => {
  const {
    date,
    cycleStart,
    cycleEnd,
    isSex,
    isProtection,
    isControl,
    dateMood,
    //★ 프런트 처리 미완
    dateCondition,
    dateMemo,
  } = req.body;
  try {
    //사용자가 입력한 정보를 dates 테이블에 입력
    //upsert 기준이 (date+userId)여야하는데 현재 sequelize는 FK를 composite key로 사용 불가... if문 쓰는 수 밖에
    const exDate = await Date.findOne({
      where: { date: date, userId: req.user.id },
    });
    //이미 존재하던 날짜 정보면 update
    if (exDate) {
      await Date.update(
        {
          date: date,
          isSex: isSex,
          isProtection: isProtection,
          isControl: isControl,
          dateMood: dateMood,
          dateCondition1: dateCondition,
          //★ 프런트 처리 미완
          dateCondition2: 0,
          dateCondition3: 0,
          dateMemo: dateMemo,
          userId: req.user.id,
        },
        {
          where: { date: date, userId: req.user.id },
        }
      );
    } else {
      //새로운 날짜 정보면 create
      await Date.create({
        date: date,
        isSex: isSex,
        isProtection: isProtection,
        isControl: isControl,
        dateMood: dateMood,
        dateCondition1: dateCondition,
        //★ 프런트 처리 미완
        dateCondition2: 0,
        dateCondition3: 0,
        dateMemo: dateMemo,
        userId: req.user.id,
      });
    }
    //사용자가 입력한 정보를 cycles 테이블에 입력
    await Cycle.create({
      bleedStart: cycleStart,
      bleedEnd: cycleEnd,
    });
    return res.status(201).json({ completed: true });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//캘린더 디테일 페이지 get
//입력된 정보가 있으면 보내주고, 없으면 "입력된 정보가 없습니다."
router.get("/api/main/date", isLoggedIn, async (req, res) => {
  //날짜를 어떻게 받아올건지? 주소로?? 아님 req.body로?
  const date = req.body.date;
  try {
    const exDate = await Date.findOne({
      where: { date: date, userId: req.user.id },
    });
    if (exDate) {
      res.send(exDate);
    } else {
      res.send("입력된 정보가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
