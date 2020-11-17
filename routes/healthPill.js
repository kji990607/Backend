const { Control, Date} = require("../models");
const schedule = require("node-schedule");
const express = require("express");
const { isLoggedIn } = require("./middlewares");
const cron = require("node-cron");
const router = express.Router();
const moment = require("moment");
const rule = new schedule.RecurrenceRule();
//const j = schedule.scheduleJob(rule, function () {});

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

router.post("/api/main/control", isLoggedIn, async (req, res) => {
  const {controlStart, controlEnd, controlTime} = req.body;
  try {
    const controlClock = req.body.controlTime.split(':');
    const controlHour = controlClock[0];
    const controlMinute = controlClock[1];
    if(controlEnd === null) {
      await Control.create({
        controlStart: controlStart,
        controlEnd: controlStart+180, // controlEnd 안정하면 180일 뒤로 자동지정
        controlHour: controlHour,
        controlMinute: controlMinute,
        userId: req.user.id,
      },{
        where: {userId: req.user.id},
      });
    } else {
      await Control.create({
        controlStart: controlStart,
        controlEnd: controlEnd,
        controlHour: controlHour,
        controlMinute: controlMinute,
        userId: req.user.id,
      },{
        where: {userId: req.user.id},
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



router.get("/api/control", isLoggedIn, async (req, res) => {
  const date = req.query.date;
  console.log(date);
  // try {
  //   Date.findOne({
  //     attributes:[isControl],
  //     where : {date:date, userId: req.user.id}, // DB의 Date테이블에서 iscontrol 값 받아와서 True인지 False인지 확인
  //   });
  //   if (isControl) {
  //     res.send("오늘 약 복용 완료");
  //   } else {
  //     res.send("오늘 약 복용 전");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return next(error);
  // }
  try {
    Control.findAll({
      attributes: [controlStart, controlEnd, controlHour, controlMinute],
      where : {date:date, userId: req.user.id},
    })
    for(let i=controlStart; i<= controlEnd; i++) {
      const alarm = cron.schedule('0 controlMinute controlHour * * *', () => {
        console.log('알람 울리기');
        alert('성공'); //res.redirect로 알람 페이지로 연결
        if (i > controlEnd) {
          alarm.destroy();
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});



module.exports = router;