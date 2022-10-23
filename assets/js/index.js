$(function() {
    getInfo()
    var layer = layui.layer
    $('#btnLogout').on('click',function(index) {
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清除本地存贮的token
            localStorage.removeItem('token')
            // 重新跳转到登录界面
            location.href = '/newlogin.html'
            // 关闭confirm询问框
            layer.close(index);
          });
    })
})

function getInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',   
        success: function(res) {
           if (res.status != 0) {
               return layui.layer.msg('获取用户信息失败')
           }
           console.log(res);
           renderAvatar(res.data)
        },
        // 无论成功还是失败都会调用comelete函数
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                // 重新跳转到登录界面
                location.href = '/newlogin.html'
               

            }
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}