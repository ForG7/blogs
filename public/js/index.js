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
  
  //获取文章分类:
  $('.menu-zs').on('click', function () {
    var id = $(this).attr('data');
    console.log(id);
    $.ajax({
      url: '/api/article/select',
      data: {
        id: id
      },
      beforeSend: function () {
        $('#loading').show();
      },
      success: function (res) {
        $('#loading').hide();
        console.log(res.length);
        $('#mainLeft').html('');
        for (var i = 0; i < res.length; i++) {
          var oDiv = $('<div class="listBox"><h1>'+res[i].title+'</h1><p class="colDefault">作者：<span class="colInfo">admin</span>时间：<span class="colInfo">'+res[i].pub+'</span>阅读：<span class="colInfo">'+res[i].views+'</span> 评论：<span class="colInfo">'+res[i].comments.length+'</span></p><dfn><p>'+res[i].int+'</p></dfn><div class="function"><a href="view?id='+res[i]._id+'" target="_blank">阅读全文</a></div></div>');
          $('#mainLeft').prepend(oDiv);
        }
        
        var page = 1;
        var limit = 3;
        var pages = Math.ceil(res.length / limit);
        
        $('#pages').html('')
        
      },
      error: function (err) {
        console.log(err);
        $('#loading').hide();
      }
    })
  });
});



