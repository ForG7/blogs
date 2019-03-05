/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

//admin 路由
var express = require('express');

var router = express.Router();

var userData = require('../models/User');

var category = require('../models/category');

var json = {};

router.use(function (req, res, next) {
  json = {
    msg: 'success',
    code: 0
  };
  next();
});

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
router.get('/category', function (req, res) {
  category.find().sort({_id: -1}).then(function (data) {
    res.render('admin/category.ejs', {data: data});
  });
  
});

//新增分类:
router.get('/category_add', function (req, res) {
  
  res.render('admin/category_add.ejs', {code: 'ross'});
});

router.post('/category_add', function (req, res) {
  //console.log(req.body.name);
  var name = req.body.name;
  category.findOne({
    name: name
  }).then(function (info) {
    if (info) {
      json.msg = '分类信息已经存在!';
      json.code = 1;
      res.send(json);
      return;
    }
    
    var categorys = new category({
      name: name
    });
    return categorys.save();
  }).then(function (newInfo) {
    json.msg = '分类信息添加成功!';
    res.send(json);
    res.end();
  });
});

//分类删除:
router.get('/category/del', function (req, res) {
  var id = req.query.id;
  
  category.remove({_id: id}).then(function (info) {
    console.log(info);
    json.msg = '删除成功!';
    res.send(json);
    res.end();
  });
});

module.exports = router;
