/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

var mongoose = require('mongoose');

var category = require('../schemas/category');

module.exports = mongoose.model('category', category);