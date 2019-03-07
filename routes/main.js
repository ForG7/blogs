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
router.get('/index', function (req, res) {
  var page = Number(req.query.page) || 1;
  category.find().then(function (info) {
    article.count().then(function (count) {
      var limit = 5;
      var pages = Math.ceil(count / limit);
      var skip = (page - 1) * limit;
      
      if(page <= 0)page = 1;
      if(page > pages)page = pages;
      
      article.find().limit(limit).skip(skip).then(function (info2) {
        res.render('main/index.ejs', {usersInfo: req.usersInfo, data: info, info2: info2, page: page, pages: pages});
      });
    })
  });
  
});

/*//首页内容分页:
router.get('/pages', function (req, res, next) {
  
  var page = Number(req.query.page) || 1;//当前在哪一页
  
  article.count().then(function (count) {
    var limit = 5;//一页展示的条数
    var pages = Math.ceil(count / 5);//总页数;
    
    res.render('main/index.ejs', {page: page, pages: pages})
  });
  next();
});*/

module.exports = router;
