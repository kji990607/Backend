const { Control, Date } = require("../models");
const schedule = require("node-schedule");
const express = require("express");
const { isLoggedIn } = require("./middlewares");
const cron = require("node-cron");
const router = express.Router();
const moment = require("moment");
// const rule = new schedule.RecurrenceRule();
//const j = schedule.scheduleJob(rule, function () {});

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

router.post("/api/main/control", isLoggedIn, async (req, res) => {
  const { controlStart, controlEnd, controlTime } = req.body;
  try {
    const controlClock = controlTime.split(":");
    const controlHour = controlClock[0];
    const controlMinute = controlClock[1];
    if (!controlEnd) {
      // controlEnd가 NULL이면 180일 뒤로 자동지정
      await Control.create({
        controlStart: controlStart,
        controlEnd: moment(controlStart, "YYYY-MM-DD")
          .add(180, "d")
          .format("YYYY-MM-DD"),
        controlHour: controlHour,
        controlMinute: controlMinute,
        userId: req.user.id,
      });
    } else {
      await Control.create(
        {
          controlStart: controlStart,
          controlEnd: controlEnd,
          controlHour: controlHour,
          controlMinute: controlMinute,
          userId: req.user.id,
        },
        {
          where: { userId: req.user.id },
        }
      );
    }
    console.log("control.create 까지 됨");
    console.log(req.user.id);
    const exControl = await Control.findAll({
      limit: 1,
      attributes: [
        "controlStart",
        "controlEnd",
        "controlHour",
        "controlMinute",
      ],
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    //알람 시작일
    const start = moment(exControl[0].controlStart);
    //알람 종료일
    const end = moment(exControl[0].controlEnd);
    //알람 기간
    let days = moment.duration(end.diff(start)).asDays();
    /*
    알람 기간만큼 for문
    시작 날짜. 시간을 변수로 만들어서 cron 시작
    cron이 한 번 실행되면 변수에 하루를 더함
    내일 해 볼것!!
     */
    //할 일
    cron.schedule(
      `0 ${exControl[0].controlMinute} ${exControl[0].controlHour} * * 0-6`,
      () => {
        console.log("cron");
      }
    );
    return res.status(201).json({ completed: true });
    return res.send("라우터 연결 됨");
  } catch (error) {
    console.error(error);
    return error;
  }
});

/*
rule.hour = controlTime[0];
    rule.minute = controlTime[1];
    const j = schedule.scheduleJob(rule, function () {
      alert('성공!') // alert 말고
    });
 */

router.get("/api/control/", isLoggedIn, async (req, res) => {
  //날짜는 주소로 받아옴
  const date = req.query.date;
  try {
    const exDate = await Date.findOne({
      attributes: ["isControl"],
      where: { date: date, userId: req.user.id },
    });
    if (exDate === null) {
      res.send("입력된 피임약 정보 없음");
    } else if (exDate.isControl) {
      res.send("오늘 피임약 복용 완료");
    } else {
      res.send("오늘 피임약 복용 전");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
