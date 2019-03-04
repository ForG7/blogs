/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

var express = require('express');

var app = express();

var ejs = require('ejs');

var admin = require('./routes/admin');

var api = require('./routes/api');

var main = require('./routes/main');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cookies = require('cookies');

var UserTable = require('./models/User');

//视图引擎
app.set('ejs', 'view engine');
//模板所在位置
app.set('views', './tpl');
//用什么模板引擎渲染出来什么格式的文件;
app.engine('html', ejs.renderFile);

//首页的访问
/*app.get('/', function (req, res) {
  
  res.render('admin.ejs', {name: 'Jack'});
  
});*/

//post格式的数据:
app.use(bodyParser.urlencoded({extended: true}));

//cookies
app.use(function (req, res, next) {
  req.cookies = new cookies(req, res);
  
  req.usersInfo = {};
  
  if (req.cookies.get('userInfo')) {
    try {
      req.usersInfo = JSON.parse(req.cookies.get('userInfo'));
      
      UserTable.findById(req.usersInfo._id).then(function (selectedInfo) {
        // console.log('selectedInfo.isAdmin:' + selectedInfo.isAdmin);
        req.usersInfo.isAdmin = selectedInfo.isAdmin;
        next();
      });
      
    } catch (e) {
      next();
    }
  } else {
    next();
  }
});

//静态资源加载
app.use('/public', express.static(__dirname + '/public'));

//路由设置:
app.use('/admin', admin);//后台管理模块

app.use('/api', api);// api逻辑

app.use('/', main); //前端页面模块

mongoose.connect('mongodb://localhost:27018/blogs', {useNewUrlParser: true}, function (err) {
  
  err ? console.log(err) : app.listen(8086);
  
});


