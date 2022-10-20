// 每次调用$.get(),post ,ajax的时候会先调用下面这个函数，拿到给ajax的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起真正的ajax请求之前，拼接统一的url
    options.url = 'http://www.liulongbin.top:3007'+ options.url
})