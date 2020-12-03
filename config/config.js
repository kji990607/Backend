const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_SECRET, //.env파일 생성 후 'DB_SECRET=각자 mysql비밀번호'로 쓰기
    database: "Fullmoon",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_SECRET,
    database: "Fullmoon",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_SECRET,
    database: "Fullmoon",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
