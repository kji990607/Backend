const express = require("express");
const { isLoggedIn } = require("./middlewares");
const { User, Date, Cycle } = require("../models");
const router = express.Router();
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//캘린더 디테일 페이지 POST
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
    dateCondition1,
    dateCondition2,
    dateCondition3,
    dateMemo,
  } = req.body;
  try {
    //사용자가 입력한 정보를 dates 테이블에 입력
    //upsert 기준이 (date+userId)여야하는데 sequelize는 FK를 composite key로 사용 불가... if문 쓰는 수 밖에?
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
          dateCondition1: dateCondition1,
          dateCondition2: dateCondition2,
          dateCondition3: dateCondition3,
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
        dateCondition1: dateCondition1,
        dateCondition2: dateCondition2,
        dateCondition3: dateCondition3,
        dateMemo: dateMemo,
        userId: req.user.id,
      });
    }
    //사용자가 입력한 정보를 cycles 테이블에 입력
    //cycleStart cycleEnd 동시에 존재하는 경우는 없게 프런트에서 처리 완료
    const exCycle = await Cycle.findOne({
      where: {
        bleedStart: { [Op.ne]: null },
        bleedEnd: null,
        userId: req.user.id,
      },
    });
    //bleedStart만 있고 bleedEnd는 없는 이전 기록이 존재하는 경우
    if (exCycle) {
      if (cycleStart) {
        //잘못된 입력. 이전 기록의 cycleEnd를 미리 설정해야 함.
        res.send("최근 생리 종료일을 먼저 입력해야 합니다.");
      } else if (cycleEnd) {
        //사용자가 cycleEnd를 설정: cycles 테이블 bleedEnd 업데이트
        await Cycle.update(
          {
            bleedEnd: cycleEnd,
          },
          {
            where: {
              bleedStart: { [Op.ne]: null },
              bleedEnd: null,
              userId: req.user.id,
            },
          }
        );
        return res.status(200).json({ completed: true });
      }
    } else {
      //이전 기록이 존재하지 않는 경우
      if (cycleStart) {
        //사용자가 cycleStart를 설정: cycles 테이블 bleedStart 저장
        await Cycle.create({
          bleedStart: cycleStart,
          userId: req.user.id,
        });
        return res.status(200).json({ completed: true });
      } else if (cycleEnd) {
        //사용자가 cycleEnd를 설정: cycles 테이블 bleedEnd 저장, bleedStart = bleedEnd - cycles.meanPeriod로 계산 후 저장
        const userInfo = await User.findOne({
          attributes: ["meanPeriod"],
          where: { id: req.user.id },
        });
        await Cycle.create({
          //meanPeriod는 필수값
          bleedStart: moment(cycleEnd, "YYYY-MM-DD")
            .subtract(userInfo.meanPeriod, "d")
            .format("YYYY-MM-DD"),
          bleedEnd: cycleEnd,
          userId: req.user.id,
        });
        return res.status(200).json({ completed: true });
      } else {
        return res.status(200).json({ completed: true });
      }
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//?calendar=2020-11-30 형식으로 년, 월 들어오면 주기 정보 보내줌
router.get("/api/main/", isLoggedIn, async (req, res) => {
  const calendar_input = req.query.calendar;
  const calendar_split = calendar_input.split("-");
  const calendar_year = calendar_split[0];
  const calendar_month = calendar_split[1];
  const find_start = moment(
    calendar_year + "-" + calendar_month + "-01"
  ).format("YYYY-MM-DD");
  const find_end = req.query.calendar;
  try {
    const bleedStart = await Cycle.findAll({
      attributes: ["bleedStart"],
      where: {
        [Op.and]: [
          { bleedStart: { [Op.gte]: find_start } },
          { bleedStart: { [Op.lte]: find_end } },
        ],
      },
      raw: true,
    });
    const bleedEnd = await Cycle.findAll({
      attributes: ["bleedEnd"],
      where: {
        [Op.and]: [
          { bleedEnd: { [Op.gte]: find_start } },
          { bleedEnd: { [Op.lte]: find_end } },
        ],
      },
      raw: true,
    });
    const eggStart = await Cycle.findAll({
      attributes: ["EggStart"],
      where: {
        [Op.and]: [
          { EggStart: { [Op.gte]: find_start } },
          { EggStart: { [Op.lte]: find_end } },
        ],
      },
      raw: true,
    });
    const eggEnd = await Cycle.findAll({
      attributes: ["EggEnd"],
      where: {
        [Op.and]: [
          { EggEnd: { [Op.gte]: find_start } },
          { EggEnd: { [Op.lte]: find_end } },
        ],
      },
      raw: true,
    });
    return [bleedStart, bleedEnd, eggStart, eggEnd];
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//캘린더 디테일 페이지 GET
//입력된 정보가 있으면 보내주고, 없으면 "입력된 정보가 없습니다."
router.get("/api/main/", isLoggedIn, async (req, res) => {
  //날짜는 req.body로 받아옴
  const date = req.query.Date_send;
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

router.get("/api/main/today", isLoggedIn, async (req, res) => {
  //날짜는 req.body로 받아옴
  const date = req.query.Today_send;
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
