const schedule = require("node-schedule");
const express = require("express");
const { isLoggedIn } = require("./middlewares");
const { Control, Date } = require("../models");
const router = express.Router();
const moment = require("moment");
const rule = new schedule.RecurrenceRule();
const j = schedule.scheduleJob(rule, function () {
});

router.post("http://localhost:3000/api/main/control", isLoggedIn, async (req, res) => {
    const {
        controlStart,
        controlEnd,
        controlHour,
        controlMinute,
    } = req.body;
    try {
        const excontrol = await Control.findAll({});
        rule.hour = controlHour;
        rule.minute = controlMinute;
        const j = schedule.scheduleJob(rule, function () {
            alert('성공!') // alert 말고 
        });
        return res.status(201).json({ completed: true });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post("http://localhost:3000/api/main/date", isLoggedIn, async (req, res) => {
    const {
        iscontrol
    } = req.body;
});
router.get("http://localhost:3000/api/main/control", isLoggedIn, async (req, res) => {
    const control = req.body.control;
    try {



        if (//프론트에서도 iscontrol? ) {
            res.send('오늘 피임약 복용 완료');
        } else {
            res.send('오늘 피임약 복용 전');
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }

});

module.exports = router;