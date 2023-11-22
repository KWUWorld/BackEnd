// const express = require('express');
// require('dotenv').config();
// const fs = require('fs');
// const Http = require('http');
// require('dotenv').config();
// const expressSanitizer = require('express-sanitizer');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const app = express();
// const http = Http.createServer(app);
// const port = 3000;
// const routes = require('./routes');
// app.use(cors());
// app.use(cookieParser());
// app.use(expressSanitizer());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());;
// app.use('/', routes);

// http.listen(port, () => {
//     console.log(`Start listen Server: ${port}`);
// });

// module.exports = http;
// reqiures
require('dotenv').config();
const fs = require('fs');
const HTTPS = require('https');
const express = require('express');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { myHomeCountSchedule } = require('./util/setSchedule');

//
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const app = express();
const https = HTTPS.createServer(app);
const router = require('./routes');
const port = process.env.EXPRESS_PORT || 3000;
let corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
};

myHomeCountSchedule();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use('/api', router);
app.use(hpp());
app.use(express.urlencoded({ extended: false }));

try {
  const option = {
    ca: fs.readFileSync(process.env.CA_FULL_CHAIN),
    key: fs.readFileSync(process.env.KEY_PRIVKEY),
    cert: fs.readFileSync(process.env.CERT_CERT),
  };

  HTTPS.createServer(option, app).listen(port, () => {
    console.log('🟢 HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
  });
} catch (error) {
  app.listen(port, () => {
    console.log('🟢 HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}

module.exports = https;
