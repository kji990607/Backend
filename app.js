const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

const authRouter = require("./routes/auth");
const pillRouter = require("./routes/healthPill");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig(passport);

app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRouter);
app.use("/", pillRouter);

app.listen(4000, () => {
  console.log("http://localhost:4000/ 에서 실행중");
});
