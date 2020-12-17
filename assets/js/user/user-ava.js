// 获取元素
let layer=layui.layer

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('.uploading').on('click', function () {
    $('.file').click()
})

// 给文件注册chenge事件==>当文件域发生改变的时候来触发该事件==>更换下剪裁区域的图片
$('.file').change(function () {
    // 1获取到我们选择的图片，==>通过文件域dom对象的files的属性
    let file = this.files[0]
    console.log(file);
    // 当我们把选择的图片出来成一个url地址
    var newImgURL = URL.createObjectURL(file)

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
    
    $('.sureBtn').on('click', function () {
        
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getName()
            }
        })
        
    })
    
})