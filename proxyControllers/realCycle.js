//실제 생리 주기 관련 정보 처리
const { User, Cycle} = require("../models");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

const json = require("./responseController");

const resObj = json.resSample();
let meanCycle,
  cycleStart,
  cycleEnd,
  outputCycle = 0;

//평균 주기 물어볼 경우
const askMeanCycle = async (req, res, next) => {
  try {
    //조회
    const exUser = await User.findOne({
      attributes: ["meanCycle"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
    if (!exUser) {
      //아이디가 틀린 경우
      meanCycle = "아이디";
    } else if (exUser.meanCycle === null) {
      //정보가 없는 경우
      meanCycle = "널";
    } else if (exUser) {
      meanCycle = exUser.meanCycle;
    }
    //처리 후 responseController형식에 맞춰줘야 함. nugu 홈페이지 responseSample 형식으로
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

//최근 주기 물어볼 경우
const askRealCycle = async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      attributes: ["id"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
    if (!exUser) {
      //아이디 틀린 경우
      cycleStart = "아이디";
      cycleEnd = "아이디";
      resObj.version = req.body.version;
      resObj.output.cycleStart = cycleStart;
      resObj.output.cycleEnd = cycleEnd;
      console.log(resObj);
      res.json(resObj);
      res.end();
      return;
    } else {
      //아이디 틀리지 않은 경우
      const recentCycle = await Cycle.findAll({
        limit: 1,
        attributes: ["bleedStart", "bleedEnd"],
        where: { userId: req.body.action.parameters.user_ID.value },
        order: [["bleedStart", "DESC"]],
        raw: true,
      });
      if (recentCycle[0] === undefined) {
        //정보가 없는 경우
        cycleStart = "널";
        cycleEnd = "널";
      } else if (recentCycle[0].bleedEnd === null) {
        //시작만 있고 끝은 없는 주기인 경우
        cycleStart = recentCycle[0].bleedStart;
        cycleEnd = "널";
      } else if (recentCycle) {
        cycleStart = recentCycle[0].bleedStart;
        cycleEnd = recentCycle[0].bleedEnd;
      }
      resObj.version = req.body.version;
      resObj.output.cycleStart = cycleStart;
      resObj.output.cycleEnd = cycleEnd;
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


/*
const date_input = req.body.action.parameters.DATE.value;
const date_split = date_input.split("-");
const date_year = date_split[0];
const date_month = date_split[1];
const fin_start = moment(
    date_year + "-" + date_month + "-01"
).format("YYYY-MM-DD");
const fin_end = req.body.action.parameters.DATE.value;
*/

const answerRealStart = async (req, res, next) => {
  console.log("요청 확인", req.body.action.parameters.DATE.value);
  console.log(req.body.action.parameters);
  // 생리주기 입력 정보를 유저가 확인하지 않았을 경우
/*  try {
    const exUser = await User.findOne({
      attributes: ["id"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  if (!exUser) {
    //아이디 틀린 경우
    outputCycle = "아이디";
    resObj.version = req.body.version;
    resObj.output.outputCycle = outputCycle;
    console.log(resObj);
    res.json(resObj);
    res.end();
    return;
  } else {
    //아이디 틀리지 않은 경우
    const exUser = await User.findOne({
      attributes: ["id"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
    const nowStart = await Cycle.findAll({
      attributes: ["bleedStart"],
      where: {
        [Op.and]: [
          {bleedStart: {[Op.gte]: fin_start}},
          {bleedStart: {[Op.lte]: fin_end}},
          {userId: req.user.id},
        ],
      },
      raw: true,
    });
    if(nowStart[0].bleedStart) {
      await Cycle.create(
          cycleStart: bleedStart
    }
  }


    const date = req.body.action.parameters.DATE.value;
    const exDate = await Date.findOne({
      where: { date: date, userId: req.user.id },
    });
    if (exDate) {
      res.send(exDate);
    } else {
      res.send("입력된 정보가 없습니다.");



    // const nowStart = await Cycle.findAll({
    //   limit: 1,
    //   attributes: ["bleedStart"],
    //   where: { userId: req.body.action.parameters.user_ID.value },
    //   order: [["createdAt", "DESC"]],
    //   raw: true,
    // });
    if (nowStart[0] === undefined) {
      await Cycle.create(
        {
          bleedStart: nowStart[0],
          userId: req.user.id,
        },
        {
          where: { userId: req.user.id },
        }
      );
    } else {
      await Cycle.update(
        {
          bleedStart: nowCycle[0],
          userId: req.user.id,
        },
        {
          where: { userId: req.user.id },
        }
      );
    }
  }
};

const answerRealEnd = async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.action.parameters);
  // 생리주기 입력 정보를 유저가 확인하지 않았을 경우
  try {
    const exUser = await User.findOne({
      attributes: ["id"],
      where: { id: req.body.action.parameters.user_ID.value },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  if (!exUser) {
    //아이디 틀린 경우
    outputCycle = "아이디";
    resObj.version = req.body.version;
    resObj.output.outputCycle = outputCycle;
    console.log(resObj);
    res.json(resObj);
    res.end();
    return;
  } else {
    //아이디 틀리지 않은 경우
    const nowEnd = await Cycle.findOne({
      limit: 1,
      attributes: ["bleedEnd"],
      where: { userId: req.body.action.parameters.user_ID.value },
      order: [["bleedEnd", "DESC"]],
      raw: true,
    });
    if (nowEnd[0] === undefined) {
      await Cycle.create(
        {
          bleedEnd: nowEnd[0],
          userId: req.user.id,
        },
        {
          where: { userId: req.user.id },
        }
      );
    } else {
      await Cycle.update(
        {
          bleedEnd: nowEnd[0],
          userId: req.user.id,
        },
        {
          where: { userId: req.user.id },
        }
      );
    }
  }*/
};


module.exports = {
  askMeanCycle,
  askRealCycle,
  // answerRealEnd,
  answerRealStart,
};
