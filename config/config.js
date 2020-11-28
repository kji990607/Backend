const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "admin",
    password: process.env.DB_SECRET, //.env파일 생성 후 'DB_SECRET=각자 mysql비밀번호'로 쓰기
    database: "Fullmoon",
    host: "hy-fullmoon.c78lrhmw2ur6.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_SECRET,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_SECRET,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
