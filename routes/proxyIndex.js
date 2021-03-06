const express = require("express");
const router = express.Router();

const { askMeanCycle, askRealCycle, answerRealStart, answerRealEnd} = require("../proxyControllers/realCycle");
const { askPillPredict } = require("../proxyControllers/pillPredict");
const { askCyclePredict } = require("../proxyControllers/cyclePredict");


//프록시 주소 라우터
router.post("/answer.meanCycle", askMeanCycle);
router.post("/answer.cycle", askRealCycle);
router.post("/output.cycleStart", answerRealStart);
router.post("/output.cycleEnd", answerRealEnd);

router.post("/answer.pill", askPillPredict);

router.post("/answer.predictBleed", askCyclePredict);

module.exports = router;

