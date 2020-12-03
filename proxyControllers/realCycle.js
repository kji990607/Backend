//실제 생리 주기 관련 정보 처리
const { User } = require("../models");

const json = require("./responseController");
let userId = 0;
let meanCycle = 0;

const checkUserID1 = async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.parameters.user_ID);
  const exUser = await User.findOne({
    attributes: ["id"],
    where: { id: req.body.parameters.user_ID.value},
  });
  try {
    if (exUser) {
      userId = exUser.id;
      return;
    } else {
      userId = 0;
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

//평균 주기 물어볼 경우
const askMeanCycle = async (req, res, next) => {
  console.log("정상 작동");
  console.log("요청:", req.body);
  try {
    //조회
    const exUser = await User.findOne({
      attributes: ["meanCycle"],
      where: { id: userId },
    });
    if (exUser) {
      meanCycle = exUser.meanCycle;
    } else {
      meanCycle = 0;
    }
    //처리 후 responseController형식에 맞춰줘야 함. nugu 홈페이지 responseSample 형식으로x
    const resObj = json.resSample();
    resObj.version = req.body.version;
    resObj.output.meanCycle = meanCycle;
    res.json(resObj);
    res.end();
    return;
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  checkUserID1,
  askMeanCycle,
};
