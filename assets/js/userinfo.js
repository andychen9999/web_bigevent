$(function () {
    inituserinfo()
    var form  = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return layer.msg('昵称长度必须在1-6个字符之间')
            }
        }
    })
    function inituserinfo() {
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                //  调用form.val()快速为表单赋值
                form.val('formUserInfo',res.data)

            }
        })
    }
    $('#btnReset').on('click',function(e) {
        e.preventDefault()
       inituserinfo()
    })
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                // 调用父页面的中的方法，重新渲染用户头像和信息
                window.parent.getInfo()
            }
        })
    })
})