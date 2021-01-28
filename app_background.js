const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload({
  /*useTempFiles: true,
  tempFileDir: "C:\\___PETER___\\PROJECT\\SanQuaProcurement\\UploadWebService\\temp\\",*/
  debug: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

const http = require('http');
//const app = require('../app'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 1192;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;