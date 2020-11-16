const { Control, Date } = require("../models");
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

router.post("/api/main/control", async (req, res) => {
  const {controlStart, controlEnd, controlHour, controlMinute} = req.body;
  try {
    //const Control = await Control.findAll({});
    await Control.create({

      controlStart: controlStart,
      controlEnd: controlEnd,
      controlHour: controlHour,
      userId: req.user.id,
    });

    const controlTime = controlHour.split(':');
    rule.hour = controlTime[0];
    rule.minute = controlTime[1];
    const j = schedule.scheduleJob(rule, function () {
      alert('성공!') // alert 말고
    });
    return res.status(201).json({completed: true});
    return res.send("라우터 연결 됨");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/*



If (controlEnd === null){
    set controlEnd = controlStart+180
    }else {
        controlEnd: controlEnd}
const i = new Date();
for(i=controlStart; i<= controlEnd; i++){
    const alarm = cron.schedule('0 controlTime[1] controlTime[0] *%/24 * *', () => {
    console.log('알람 울리기');
    alert('성공');
    If (i>controlEnd){
      alarm.destroy(); }
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