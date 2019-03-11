/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/
$(function () {
  
  //登录隐藏
  $('#loginBox').find('a').on('click', function () {
    $('#loginBox').hide();
    $('#registerBox').show();
  });
  
  //注册隐藏
  $('#registerBox').find('a').on('click', function () {
    $('#loginBox').show();
    $('#registerBox').hide();
  });
  
  //注册:
  $('#reg').on('click', function () {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: '/api/user/register',
      data: {
        username: $('#user').val(),
        password: $('#pass').val(),
        cpassword: $('#re-pass').val()
      },
      success: function (json) {
        if (json.code === 5) {
          $('#registerBox p.colWarning').html(json.msg);
          setTimeout(function () {
            $('#loginBox').show();
            $('#registerBox').hide();
          }, 1000);
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
  
  //登录:
  $('#login').on('click', function () {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: '/api/user/login',
      data: {
        username: $('#loginBox').find('input[name="username"]').val(),
        password: $('#loginBox').find('input[name="password"]').val()
      },
      success: function (json) {
        if (json.code != 0) {
          $('#loginBox p.colWarning').html(json.msg);
        } else {
          $('#loginBox p.colWarning').html(json.msg);
          window.location.reload();
        }
      }
      ,
      error: function (err) {
        console.log(err);
      }
    });
  });
  
  //退出登录：
  $('#logoutBtn').on('click', function () {
    $.ajax({
      url: '/api/user/logout',
      success: function (res) {
        console.log(res);
        if (res.code) {
          window.location.reload();
        }
      }
    })
  });
  
  var id = '';
  var page = 1;
  var limit = 2;
  
  function fn(res) {
    for (var i = 0; i < res.info.length; i++) {
      var oDiv = $('<div class="listBox"><h1>' + res.info[i].title + '</h1><p class="colDefault">作者：<span class="colInfo">admin</span>时间：<span class="colInfo">' + res.info[i].pub + '</span>阅读：<span class="colInfo">' + res.info[i].views + '</span> 评论：<span class="colInfo">' + res.info[i].comments.length + '</span></p><dfn><p>' + res.info[i].int + '</p></dfn><div class="function"><a href="view?id=' + res.info[i]._id + '" target="_blank">阅读全文</a></div></div>');
      $('#mainLeft').prepend(oDiv);
    }
    
    var pages = Math.ceil(res.count / limit);
    
    if (page === 1) {
      console.log(page, page===1);
      $('#prev').html('').prepend($('<button type="button" class="btn btn-default btn-lg" disabled="disabled">已经是第一页</button>'));
    } else {
      $('#prev').html('').prepend($('<a href="javascript:;" id="prev">上一页</a>'));
    }
    
    $('#global').html(page + ' / ' + pages);
    
    if (page === pages) {
      $('#next').html('').prepend($('<button type="button" class="btn btn-default btn-lg" disabled="disabled">已经是最后一页</button>'));
    } else {
      $('#next').html('').prepend($('<a href="javascript:;" id="next">下一页</a>'));
    }
  }
  
  //获取文章分类:
  $('.menu-zs').on('click', function () {
    id = $(this).attr('data');
    page = 1;
    $.ajax({
      url: '/api/article/select',
      data: {
        id: id,
        limit: limit
      },
      beforeSend: function () {
        $('#loading').show();
      },
      success: function (res) {
        $('#loading').hide();
        $('#mainLeft').html('');
        $('#next').html('');
        $('#prev').html('');
        $('#global').html();
        fn(res);
      },
      error: function (err) {
        $('#loading').hide();
      }
    });
    
  });
  
  //文章分类分页:
  function next() {
    $.ajax({
      url: '/api/article/page',
      data: {
        id: id,
        page: page,
        limit: limit
      },
      success: function (res) {
        $('#mainLeft').html('');
        fn(res);
      }
    });
  }
  
  $('#next').on('click', function(){
    page++;
    next();
  });
  
  $('#prev').on('click', function () {
    page--;
    next();
  });
  
});



