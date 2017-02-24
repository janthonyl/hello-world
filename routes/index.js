var express = require('express');
var router = express.Router();
var path = require('path');
var fs  = require('fs');
router.get('/', function(req, res, next) {
    res.render('./../index.html');
});
router.get('/mainjs*',  function(req, res,  next){
    var strPathToFile = path.join(appRootObtainedFromServerJs, 'main.js');
    res.sendFile(strPathToFile);
});
module.exports = router;