const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const authRouter = require("./routes/auth");
const calendarRouter = require("./routes/calendar");
const healthPillRouter = require("./routes/healthPill");
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

app.use(morgan("combined"));
app.use(cors({ origin: "http://13.124.67.98", credentials: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
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
app.use("/", calendarRouter);
app.use("/", healthPillRouter);

app.listen(4000, () => {
  console.log("실행중");
});
app.set("port", process.env.PORT || 8001);

// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("combined"));
// } else {
//   app.use(morgan("dev"));
// }

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

// if (process.env.NODE_ENV === "production") {
//   sessionOption.proxy = true;
//   sessionOption.cookie.secure = true;
// }

app.use(session(sessionOption));
app.use(flash());
