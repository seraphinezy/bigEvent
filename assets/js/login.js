$(function () {
    // 去登录
    $('.login').on('click', function () {
        $('.login').hide()
        $('.register').show()
        $('#login').hide()
        $('#register').show()
    })
// 去注册
    $('.register').on('click', function () {
        $('.login').show()
        $('.register').hide()
        $('#login').show()
        $('#register').hide()
       
    })


 //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
 let form = layui.form;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repass: function(value,item) {
            if (value !== $('.ipts').val()) {
                return '两次输入的密码不一致'
            }
        }
    })
// 注册
    $('#register').on('submit', function (e) {
        e.preventDefault()
        let data = $('#register').serialize()
        console.log(data);
        $.ajax({
            type: 'POST',
            url:'/api/reguser',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                    return console.log(res.message);
                   
                }
                layer.msg(res.message);
                
            }
           
        })
       
        $('#register')[0].reset()
        // 去登录 点击触发
        $('.register').click()
    })

// 注册
    $('#login').on('submit', function (e) {
        e.preventDefault()
        let data = $('#login').serialize()
        $.ajax({
            type:'POST',
            url: '/api/login',
            data,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //   实现出现提示框和跳转
                layer.msg(res.message, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    localStorage.setItem('token', res.token)
                        // console.log(localStorage.setItem('token', res.token));
                    location.href='index.html'
                  });  
            }
        })
    })
   





})