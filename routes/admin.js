/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

//admin 路由
var express = require('express');

var router = express.Router();

var userData = require('../models/User');

//用户信息展示:
router.get('/userslist', function (req, res) {
  
  var page = Number(req.query.page) || 1;//当前在哪一页;
  
  userData.count().then(function (count) {
    var limit = 5;//忽略的条数 aaa
    var pages = Math.ceil(count / limit);//总页数
    var a = (page - 1) * limit;
    
    if (page < 0) page = 0;
    if (page > pages) page = pages;
    
    userData.find().limit(limit).skip(a).then(function (data) {
      res.render('admin/admin.ejs', {
        Data: data,
        limit: limit,
        count: count,//数据总条数 aaa
        pages: pages,
        page: page
      });
    });
  });
  
  
});

//分类管理:
router.get('/category', function(req, res){
  res.render('admin/category.ejs', {name: 'test'});
});

//新增分类:
router.get('/category_add', function(req, res){
  res.render('admin/category_add.ejs', {name: 'ross'});
});

module.exports = router;
