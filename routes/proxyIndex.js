const express = require("express");
const router = express.Router();

//proxyController 예시 형식
const { checkUserID1, askMeanCycle } = require("../proxyControllers/realCycle");

//프록시 주소 라우터
router.post("/check.userID1", checkUserID1);
router.post("/answer.meanCycle", askMeanCycle);

module.exports = router;
