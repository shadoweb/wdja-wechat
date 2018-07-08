//app.js
var config = require('./config')
App({
  globalData: {
    userInfo: null,
    url: config.service.host,
    title: 'WDJA小程序',
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
        "pagePath": "/pages/aboutus/index",
        "text": "简介",
        "iconPath": "/pages/template/img/tabBar_about.png",
        "selectedIconPath": "/pages/template/img/tabBar_about_cur.png",
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
      }
    ],
    "position": "bottom"
    },
  tabBar_aboutus: {
    "color": "#9E9E9E",
    "selectedColor": "#f00",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        "selectedColor": "#3eb4fa",
        active: false
      },
      {
        "pagePath": "/pages/aboutus/index",
        "text": "简介",
        "iconPath": "/pages/template/img/tabBar_about.png",
        "selectedIconPath": "/pages/template/img/tabBar_about_cur.png",
        "selectedColor": "#3eb4fa",
        active: true
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        "selectedColor": "#3eb4fa",
        active: false
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        "selectedColor": "#3eb4fa",
        active: false
      }
    ],
    "position": "bottom"
  },

  tabBar_contact: {
    "color": "#9E9E9E",
    "selectedColor": "#f00",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/template/img/tabBar_home.png",
        "selectedIconPath": "/pages/template/img/tabBar_home_cur.png",
        "selectedColor": "#3eb4fa",
        active: false
      },
      {
        "pagePath": "/pages/aboutus/index",
        "text": "简介",
        "iconPath": "/pages/template/img/tabBar_about.png",
        "selectedIconPath": "/pages/template/img/tabBar_about_cur.png",
        "selectedColor": "#3eb4fa",
        active: true
      },
      {
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": "/pages/template/img/tabBar_product.png",
        "selectedIconPath": "/pages/template/img/tabBar_product_cur.png",
        "selectedColor": "#3eb4fa",
        active: false
      },
      {
        "pagePath": "/pages/news/index",
        "text": "新闻",
        "iconPath": "/pages/template/img/tabBar_news.png",
        "selectedIconPath": "/pages/template/img/tabBar_news_cur.png",
        "selectedColor": "#3eb4fa",
        active: false
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
        "pagePath": "/pages/aboutus/index",
        "text": "简介",
        "iconPath": "/pages/template/img/tabBar_about.png",
        "selectedIconPath": "/pages/template/img/tabBar_about_cur.png",
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
        "pagePath": "/pages/aboutus/index",
        "text": "简介",
        "iconPath": "/pages/template/img/tabBar_about.png",
        "selectedIconPath": "/pages/template/img/tabBar_about_cur.png",
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
      }
    ],
    "position": "bottom"
  },



  },
})