// 每次调用$.get(),post ,ajax的时候会先调用下面这个函数，拿到给ajax的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起真正的ajax请求之前，拼接统一的url
    options.url = 'http://www.liulongbin.top:3007'+ options.url

    // 同意为有权限的借口，设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') ||
            ''}
        
    }
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            // 重新跳转到登录界面
            location.href = '/newlogin.html'
    } 
}
})