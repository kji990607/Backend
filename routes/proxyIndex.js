const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");

//proxyController 예시 형식
const { askMeanCycle } = require("../proxyControllers/realCycle");

//프록시 주소 라우터
router.post("/answer.meanCycle", isLoggedIn, askMeanCycle);

module.exports = router;
