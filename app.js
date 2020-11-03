const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("http://localhost:5000/ 에서 실행중");
});