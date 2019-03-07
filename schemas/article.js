/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var article = new Schema({
  
  //标题
  title: {
    type: String,
    default: ''
  },
  
  int: {
    type: String,
    default: ''
  },
  
  //评论
  comments: {
    type: Array,
    default: []
  },
  
  //阅读量
  views: {
    type: Number,
    default: 0
  },
  
  //发布时间
  pub: {
    type: Date,
    default: new Date()
  },
  
  //内容
  content: {
    type: String,
    default: ''
  },
  
  //文章分类:
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  
  //分类名称:
  names: {
    type: String,
    default: ''
  }
});

module.exports = article;


















