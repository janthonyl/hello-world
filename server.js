var express = require('express');
var path = require('path');
//Store the full path to the project folder in a global variable. 
global.appRootObtainedFromServerJs = path.resolve(__dirname);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
//Handle static files in the /app folder
var strAppFolder  = path.join(__dirname, '/app');
app.use('/app', express.static(strAppFolder));
//Handle any static files in the folder /public 
var strPublicFolder  =path.join(__dirname, '/public');
app.use(express.static(strPublicFolder));
//Handle any static files in the folder /node_modules/@angular
var strAngularFolder  = path.join(__dirname, '/node_modules/@angular');
app.use("/node_modules/@angular", express.static(strAngularFolder));
//Handle static files in /node_modules/rxjs
var strRxJsFolder  = path.join(__dirname, '/node_modules/rxjs');
app.use("/node_modules/rxjs", express.static(strRxJsFolder));
//Set the folder for storing html files (Views)
app.set('views', path.join(__dirname, 'views'));
//For Views use an html templating-engine named 'ejs'. 
app.set('view engine', 'ejs'); 
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
var controllerForIndexPage = require('./routes/index');
var controllerForTo_Do_Page = require('./routes/todos');
app.use('/', controllerForIndexPage);
app.use('/api/v1/', controllerForTo_Do_Page);
app.use('/favicon.ico', function(req, res, next) {
    res.writeHead(200, {
        'Content-Type':'image/x-icon'
    })
 });
var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;