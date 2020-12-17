
// 定义函数
function getName() {
    // 发送ajjax请求获取用户的信息
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 请求头的配置
    //     headers:{
    //         Authorization:localStorage.getItem('token')
    //    },
        success: function (res) {
            if (res.status !== 0) {
                return 
            }
        //    console.log(res);
            // 渲染出来头像和昵称
            // 注意点：1.如果有头像就显示头像，没有头像显示文字
            //         2.如果有昵称优先展示昵称，没有才展示用户名
            // console.log(res.data);
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
            

        },

        complete: function (res) {
            // console.log(res);
            let date = res.responseJSON
            if (date.status === 1 && date.message == '身份认证失败！') {
                location.href = '/home/login.html'
                localStorage.removeItem('token')
            }
        }
    })
}
getName()


$(function () {
// 声明变量
    let layer = layui.layer;

    // 给退出按钮注册点击事件，点击以后会出现弹出层（主要是layui实现）
    // 点击以后会跳转到login页面，并且会把token删除
    $('.exit').on('click', function () {
        
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
          });
    })



})