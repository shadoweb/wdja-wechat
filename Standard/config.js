/**
 * 小程序配置文件
 * 1.0.2.6
 * 详情页分享,搜索宽度自适应,表单清空,导航配置并入APP
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var appid = "wx0a9e41cd4c4f4502";
var host = 'https://wdja.cn';
var title = 'WDJA网站内容管理系统';
var aboutus = '关于我们';
var contact = '联系我们';
var news = '新闻资讯';
var product = '产品中心';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        appid,
        host,
        title,
        aboutus,
        contact,
        news,
        product,
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;