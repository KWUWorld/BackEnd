// reqiures
require("dotenv").config();
const fs = require("fs");
const HTTPS = require("https");
const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const { stream } = require("./util/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const { myHomeCountSchedule } = require("./util/setSchedule");

const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const app = express();
const https = HTTPS.createServer(app);
const router = require("./routes");
const port = process.env.EXPRESS_PORT || 4000;
let corsOptions = {
  origin: ["*", "http://localhost:3000", "https://kwuworld.org"],
  //origin: process.env.FRONT_END_URL,
  credentials: true,
};

myHomeCountSchedule();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined", { stream }));
app.use(express.json());
app.use("/api", router);
app.use(hpp());
app.use(express.urlencoded({ extended: false }));

try {
  const option = {
    ca: fs.readFileSync(process.env.CA_FULL_CHAIN),
    key: fs.readFileSync(process.env.KEY_PRIVKEY),
    cert: fs.readFileSync(process.env.CERT_CERT),
  };
  console.log(option, "123123123123123");

  HTTPS.createServer(option, app).listen(port, () => {
    console.log("🟢 HTTPS 서버가 실행되었습니다. 포트 :: " + port);
  });
} catch (error) {
  app.listen(port, () => {
    console.log("🟢 HTTP 서버가 실행되었습니다. 포트 :: " + port);
  });
}

module.exports = https;
