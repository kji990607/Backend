const { Control, Date} = require("../models");
const schedule = require("node-schedule");
const express = require("express");
const { isLoggedIn } = require("./middlewares");
const cron = require("node-cron");
const router = express.Router();
const moment = require("moment");
const rule = new schedule.RecurrenceRule();
const j = schedule.scheduleJob(rule, function () {});

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

router.post("/api/main/control", isLoggedIn, async (req, res) => {
  let {controlStart, controlEnd, controlHour} = req.body;
  try {
    //const Control = await Control.findAll({});
    await Control.create({

      controlStart: controlStart,
      controlEnd: controlEnd,
      controlHour: controlHour,
      userId: req.user.id,
    },{
      where: {userId: req.user.id},
    });

    const controlTime = controlHour.split(':');

    if(controlEnd === null) {
      await Control.update({
        controlEnd: controlStart+180, // controlEnd 안정하면 180일 뒤로 자동지정
      },{
        where: {userId: req.user.id},
      });
    } else {
      await Control.update({
        controlEnd: controlEnd
      },{
        where: {userId: req.user.id},
      });
    }

    for(let i=controlStart; i<= controlEnd; i++) {
      const alarm = cron.schedule('0   controlTime[1] controlTime[0] * * *', () => {
        console.log('알람 울리기');
        alert('성공');
        if (i > controlEnd) {
          alarm.destroy();
        }
      });
    }
    return res.status(201).json({completed: true});
    return res.send("라우터 연결 됨");
  }catch (error) {
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



router.get("/api/main/control", isLoggedIn, async (req, res) => {
  const control = req.body.control;
  try {
    Date.findOne({
      attributes:[isControl],
      where : {date:date, userId: req.user.id}, // DB의 Date테이블에서 iscontrol 값 받아와서 True인지 False인지 확인
    });
    if (isControl) {
      res.send("오늘 약 복용 완료");
    } else {
      res.send("오늘 약 복용 전");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get("/api/main/control", async (req, res) => {
//
// });

module.exports = router;