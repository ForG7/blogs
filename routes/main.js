/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

//main

var express = require('express');

var router = express.Router();

//localhost:8086/index
router.get('/index', function (req, res) {
  
  res.render('main/index.ejs', {usersInfo: req.usersInfo});
  
});

module.exports = router;
