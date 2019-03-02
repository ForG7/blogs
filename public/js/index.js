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
});



