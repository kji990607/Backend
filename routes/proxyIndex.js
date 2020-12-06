const express = require("express");
const router = express.Router();

//proxyController 예시 형식
const { askMeanCycle, askRealCycle } = require("../proxyControllers/realCycle");
//const { askPillPredict } = require("../proxyControllers/pillPredict");

//프록시 주소 라우터
router.post("/answer.meanCycle", askMeanCycle);
//router.post("/answer.pill", askPillPredict);
router.post("/answer.cycle", askRealCycle);

module.exports = router;
