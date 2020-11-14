const schedule = require("node-schedule");
const express = require("express");
// 미들웨어가 꼭 필요한가? - 설정해둔 약이 있는지 확인?
const { Control, Date } = require("../models");
const router = express.Router();
const moment = require("moment");
const rule = new schedule.RecurrenceRule();

router.post("/api/main/health", async (req, res) => {
  const { controlStart, controlEnd, controlHour, controlMinute } = req.body;
  try {
    //     const excontrol = await Control.findAll({});
    //     rule.hour = controlHour;
    //     rule.minute = controlMinute;
    //     const j = schedule.scheduleJob(rule, function () {
    //         alert('성공!')
    //     });
    //     return res.status(201).json({ completed: true });
    res.send("라우터 연결 됨");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get("/api/main/health", async (req, res) => {
//
// });

module.exports = router;
