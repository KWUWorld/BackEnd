const express = require('express');
require('dotenv').config();
const fs = require('fs');
const Http = require('http');
require('dotenv').config();
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const http = Http.createServer(app);
const port = 3000;
const routes = require('./routes');
app.use(cors());
app.use(cookieParser());
app.use(expressSanitizer());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());;
app.use('/', routes);

http.listen(port, () => {
    console.log(`Start listen Server: ${port}`);
});

module.exports = http;