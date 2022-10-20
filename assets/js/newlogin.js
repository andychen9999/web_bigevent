$(function() {
    // 点击去注册账号的连接
    $('#link_reg').on('click',function() {
        $('.login-box').hide();
        $('.reg-box').show()
    })

    // 点击去登录的连接
    $('#link_login').on('click',function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })
    // 从layui中获取form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd : [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   校验两次密码
        repwd: function(value) {
         var str =  $('.reg-box [name = password').val()
         if (str !== value) {
            return '两次密码不一致'
         }
        }
    })
    var data = {
        username: $('#form_reg [name = username]').val(),
        password: $('#form_reg [name = password]').val()
    }
    $('#form_reg').on('submit',function(e) {
        e.preventDefault();
        $.post('/api/reguser',data,function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click();
        })

    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                // console.log(res.token);
                // 将登陆成功得到的token字符串，保存到localStorage中 
                localStorage.setItem('token',res.token)
                location.href = '/newindex.html'
            }
        })
    })

})