/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

var mongoose = require('mongoose');

var userSchema = require('../schemas/users');

module.exports = mongoose.model('users', userSchema);