//세션에 id 저장 후 로그인 시 사용자의 id, userName, userEmail 저장
const local = require("./localStrategy");
const { User } = require("../models");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser 실행");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserializeUser 실행");
    User.findOne({
      attributes: ["id", "userName", "userEmail"],
      where: { id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
};
