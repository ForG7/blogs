/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

//main

var express = require('express');

var router = express.Router();

var category = require('../models/category');

//localhost:8086/index
router.get('/index', function (req, res) {
  
  category.find().then(function (info) {
    res.render('main/index.ejs', {usersInfo: req.usersInfo, data: info});
  });
  
});

module.exports = router;
