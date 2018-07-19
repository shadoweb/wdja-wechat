//app.js
var config = require('./config')
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          //console.log('获取用户登录凭证：' + code);
          // --------- 发送凭证 ------------------
          wx.request({
            url: config.service.host + '/api.php',
            data: {
               code: code,
               type: 'wxlogin'
               },
            success: function (res) {
              //console.log(res.data)
            }
          });
          // ------------------------------------
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
    //小程序强制更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      //console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })

  },


  globalData: {
    appid: config.service.appid,//"wx0a9e41cd4c4f4502",
    userInfo: null,
    url: config.service.host,//'https://wdja.cn',
    title: config.service.title,//'WDJA小程序',
    aboutus: config.service.aboutus,
    contact: config.service.contact,
    news: config.service.news,
    product: config.service.product,
  tabBar_index: {
    "color": "#9E9E9E",
    "selectedColor": "#3eb4fa",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        active: true
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/contact/index",
        "text": "联系",
        "iconPath": "/pages/template/img/tabBar_contact.png",
        "selectedIconPath": "/pages/template/img/tabBar_contact_cur.png",
        active: false
      }
    ],
    "position": "bottom"
    },
  tabBar_aboutus: {
    "color": "#9E9E9E",
    "selectedColor": "#3eb4fa",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/contact/index",
        "text": "联系",
        "iconPath": "/pages/template/img/tabBar_contact.png",
        "selectedIconPath": "/pages/template/img/tabBar_contact_cur.png",
        active: false
      }
    ],
    "position": "bottom"
  },

  tabBar_contact: {
    "color": "#9E9E9E",
    "selectedColor": "#3eb4fa",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/contact/index",
        "text": "联系",
        "iconPath": "/pages/template/img/tabBar_contact.png",
        "selectedIconPath": "/pages/template/img/tabBar_contact_cur.png",
        active: true
      }
    ],
    "position": "bottom"
  },

  tabBar_news: {
    "color": "#9E9E9E",
    "selectedColor": "#3eb4fa",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        active: true
      },
      {
        "pagePath": "/pages/contact/index",
        "text": "联系",
        "iconPath": "/pages/template/img/tabBar_contact.png",
        "selectedIconPath": "/pages/template/img/tabBar_contact_cur.png",
        active: false
      }
    ],
    "position": "bottom"
  },

  tabBar_product: {
    "color": "#9E9E9E",
    "selectedColor": "#3eb4fa",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        active: true
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        active: false
      },
      {
        "pagePath": "/pages/contact/index",
        "text": "联系",
        "iconPath": "/pages/template/img/tabBar_contact.png",
        "selectedIconPath": "/pages/template/img/tabBar_contact_cur.png",
        active: false
      }
    ],
    "position": "bottom"
  },


  },



  
})