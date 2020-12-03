const express = require("express");
const { isLoggedIn } = require("./middlewares");

//proxyController 예시 형식
const { askMeanCycle, } = require("../proxyControllers/realCycle");
const router = express.Router();

//프록시 주소 라우터
router.post("/answer.meanCycle", isLoggedIn, askMeanCycle);

module.exports = router;
