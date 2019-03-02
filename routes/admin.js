/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

//admin 路由
var express = require('express');

var router = express.Router();

router.get('/welcome', function (req, res) {

  res.render('admin/admin.ejs', {});
  
});

module.exports = router;
