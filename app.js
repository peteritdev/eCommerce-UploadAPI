const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const _ = require('lodash');



// Set up the express app
const app = express();

// Enable files upload - express-fileupload
/*app.use(fileUpload({
  //createParentPath: true
  useTempFiles: true,
  tempFileDir: "C:\\___PETER___\\PROJECT\\SanQua Procurement\\temp\\",
  debug: true
}));*/
app.use(fileUpload({
  /*useTempFiles: true,
  tempFileDir: "C:\\___PETER___\\PROJECT\\SanQuaProcurement\\UploadWebService\\temp\\",*/
  debug: true
}));

//Log requests to the console
app.use( logger('dev') );

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);




app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;