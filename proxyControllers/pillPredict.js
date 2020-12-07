//진통제 추천
const { User, Date } = require("../models");
const pillsPrediction = require("../PillsPrediction");

const json = require("./responseController");

const resObj = json.resSample();
let pillPredict = 0;

const askPillPredict = async (req, res, next) => {ac
  try {
    //사용자 존재하는지 먼저 조회
    const exUser = await User.findOne({
      attributes: ["id"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
    if (!exUser) {
      //아이디 틀린 경우
      resObj.version = req.body.version;
      resObj.output.pillPredict = "아이디";
      console.log(resObj);
      res.json(resObj);
      res.end();
      return;
    } else {
      //아이디 존재하는 경우
      //최근 날짜 정보가 존재하는지 조회
      const dateInfo = await Date.findAll({
        limit: 1,
        attributes: ["date"],
        where: { userId: req.body.action.parameters.user_ID.value },
        order: [["date", "DESC"]],
        raw: true,
      });
      //최근 날짜 정보 존재하지 않는 경우
      if (dateInfo[0] === undefined) {
        pillPredict = "널";
      } else {
        //아이디도 존재, 최근 날짜 정보도 존재하는 경우
        //머신러닝으로 pillReco 입력
        await pillsPrediction.modelPredictingOnUserDataset(
            req.body.action.parameters.user_ID.value
        );
        //pillReco 조회
        const pillFind = await Date.findAll({
          limit: 1,
          attributes: ["pillReco"],
          where: { userId: req.body.action.parameters.user_ID.value },
          order: [["date", "DESC"]],
          raw: true,
        });
        pillPredict = pillFind[0].pillReco;
      }
      resObj.version = req.body.version;
      resObj.output.pillPredict = pillPredict;
      console.log(resObj);
      res.json(resObj);
      res.end();
      return;
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  askPillPredict,
};
