
$(function () {
    let form = layui.form
    let layer = layui.layer
    
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        
       
        newPwd: function (value, item) {
            // console.log(value);
            // console.log($('.oldpass').val());
            if (value === $('.oldpass').val()) {
                // console.log(1);
                return '两次密码必须不一样'

            }
            },

        renewpass: function (value) {
            if (value !== $('.newPwd').val()){
                    return '两次密码必须一样'
                }
            }
        
        
        
    })

    
    
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
        
})



})