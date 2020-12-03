/*
const { table } = require("../models");

const json = require("./responseController");

const sample1 = async (req, res, next) => {
  try {
    //처리
    //처리 후 responseController형식에 맞춰줘야 함. nugu 홈페이지 responseSample 형식으로
    const resObj = json.resSample();
    resObj.version = req.body.version;
    resObj.a = b;
    res.json(resObj);
    res.end();
    return;
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const sample2 = async (res, res, next) => {};

module.exports = {
  sample1,
  sample2,
};
 */
