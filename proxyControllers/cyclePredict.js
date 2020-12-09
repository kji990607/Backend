//주기 예측
const { User, Cycle, Predict } = require("../models");
const cyclesMensesOvulationPrediction = require("../CyclesMensesOvulationPrediction");
const moment = require("moment");

const json = require("./responseController");

const resObj = json.resSample();
let predictStart,
  predictEnd = 0;

const askCyclePredict = async (req, res, next) => {
  try {
    //사용자 존재하는지 조회
    const exUser = await User.findOne({
      attributes: ["id"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
    if (!exUser) {
      //아이디 틀린 경우
      resObj.version = req.body.version;
      resObj.output.predictStart = "아이디";
      resObj.output.predictEnd = "아이디";
      console.log(resObj);
      res.json(resObj);
      res.end();
      return;
    } else {
      //아이디가 존재하는 경우
      //최근 사이클이 존재하는지 조회
      const cycleInfo = await Cycle.findAll({
        limit: 1,
        attributes: ["bleedStart", "bleedEnd"],
        where: { userId: req.body.action.parameters.user_ID.value },
        order: [["bleedStart", "DESC"]],
        raw: true,
      });
      if (cycleInfo[0] === undefined) {
        predictStart = "널";
        predictEnd = "널";
      } else {
        /* 머신러닝 오류...?
                //사이클 존재하는 경우 일단 머신러닝
                await cyclesMensesOvulationPrediction.predictAllValues(
                  req.body.action.parameters.user_ID.value
                );
                */
        //Predict 테이블 조회
        const predictInfo = await Predict.findAll({
          limit: 1,
          attributes: ["predictBleedStart", "predictBleedEnd"],
          where: { userId: req.body.action.parameters.user_ID.value },
          order: [["predictBleedStart", "DESC"]],
          raw: true,
        });
        if (predictInfo[0] === undefined) {
          //사이클존재하지만 predict가 없는 경우 => 가장 최근 주기 + meanCycle
          //meanCycle 조회
          const exUser = await User.findOne({
            attributes: ["meanCycle", "meanPeriod"],
            where: { id: req.body.action.parameters.user_ID.value },
          });
          predictStart = moment(cycleInfo[0].bleedStart, "YYYY-MM-DD")
            .add(exUser.meanCycle, "d")
            .format("YYYY-MM-DD");
          predictEnd = moment(predictStart)
            .add(exUser.meanPeriod, "d")
            .format("YYYY-MM-DD");
        } else {
          //사이클 존재하고 predict가 있는 경우
          predictStart = predictInfo[0].predictBleedStart;
          predictEnd = predictInfo[0].predictEnd;
        }
      }
      resObj.version = req.body.version;
      resObj.output.predictStart = predictStart;
      resObj.output.predictEnd = predictEnd;
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
  askCyclePredict,
};
