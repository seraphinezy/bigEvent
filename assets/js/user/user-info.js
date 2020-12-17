
$(function () {
     
   let form=layui.form
   let layer=layui.layer
   
    // 获取表单的值，获取用户信息
    function getInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
            console.log(res);

            //给表单赋值
            //采用layui的方式给表单赋值
            form.val("formTest", res.data);
        }
        })
    }
     getInfo()
    
    // 重置按钮，重置表单的值
    $('.reset').on('click', function (e) {
        e.preventDefault()
        getInfo()
        
    })
   
    // 实现表单的提交功能
    // 1.给form注册submit事件
    // 2.阻止其默认行为
    // 3.收集表单数据
    // 4.发送ajax请求
    $('form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                  
                }
                layer.msg('修改用户信息成功')
              window.parent.getName()
            }
        })
    })

 })

 

