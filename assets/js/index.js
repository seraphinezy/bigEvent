
// 定义函数
function getName() {
    // 发送ajjax请求获取用户的信息
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 请求头的配置
        headers: {
            Authorization:localStorage.getItem('token')
        },
        success: function (res) {
           console.log(res);
            // 渲染出来头像和昵称
            // 注意点：1.如果有头像就显示头像，没有头像显示文字
            //         2.如果有昵称优先展示昵称，没有才展示用户名
            let name = res.data.nickname || res.data.username
            // console.log(name);
            $('.welcome').text(name)
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }

            // 头像和照片2选1
            // 如果没有照片就显示头像，有照片就显示照片
            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src',res.data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                // 没有图片
                $('.text-avatar').show().text(name[0].toUpperCase())
                $('.layui-nav-img').hide()
           }
            

        }
    })
}
getName()