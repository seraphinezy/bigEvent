// 配置根路径
$.ajaxPrefilter(function (options) {
    options.url='http://ajax.frontend.itheima.net'+options.url
})