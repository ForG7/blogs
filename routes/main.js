/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

//main
var express = require('express');

var router = express.Router();

var category = require('../models/category');

var article = require('../models/article');

//localhost:8086/index
router.get('/index', function (req, res, next) {
  var page = Number(req.query.page) || 1;
  category.find().then(function (info) {
    article.count().then(function (count) {
      var limit = 2;
      var pages = Math.ceil(count / limit);
      var skip = (page - 1) * limit;
      
      if (page <= 0) page = 1;
      if (page > pages) page = pages;
      
      article.find().limit(limit).skip(skip).then(function (info2) {
        res.render('main/index.ejs', {usersInfo: req.usersInfo, data: info, info2: info2, page: page, pages: pages});
      });
    });
  });
});

//阅读全文:
router.get('/view', function (req, res) {
  var id = req.query.id;
  
  category.find().then(function (info2) {
    article.findOne({
      _id: id
    }).then(function (info) {
      info.views++;
      info.save();
      res.render('main/view.ejs', {info: info, usersInfo: req.usersInfo, data: info2});
    });
  });
});

module.exports = router;
