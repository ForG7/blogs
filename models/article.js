/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

var mongoose = require('mongoose');

var article = require('../schemas/article');

module.exports = mongoose.model('articles', article);