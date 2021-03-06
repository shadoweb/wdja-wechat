// pages/news/index.js
import {
  String
} from '../../utils/util.js';
var WxParse = require('../../pages/wxParse/wxParse');
import {
  Promisify
} from '../../utils/Promisify';
const request = Promisify(wx.request);
var page = 1;
var page_size = 15;
var GetList = function(that) {
  that.setData({
    hidden: false
  });
  request({
      url: getApp().globalData.url + '/api.php',
      method: 'GET',
      data: {
        appid: getApp().globalData.appid,
        type: 'list',
        module: 'wechat/news',
        classid: wx.getStorageSync('ncid'),
        page: page,
        page_size: page_size
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
    })
    .then(function(res) {
      var list = that.data.list;
      res.data.forEach((item) => {
        item.time = item.time.substring(0, 10)
      })
      if (that.data.hidden == false) {
        for (var i = 0; i < res.data.length; i++) {
          list.push(res.data[i])
        }
        that.setData({
          list: list
        });
        page++;
      }
      that.setData({
        hidden: true
      });
    })
}

Page({
  /**
   * 页面的初始数据
   */
  onShareAppMessage: function() {
    var bpages = getCurrentPages()
    var bcurrentPage = bpages[bpages.length - 1]
    var burl = bcurrentPage.route
    return {
      title: getApp().globalData.news,
      path: burl, //'/pages/index/index'
    }
  },

  data: {
    url: getApp().globalData.url,
    //配置tabBar
    tabBar: getApp().globalData.tabBar_news,
    hidden: true,
    list: [],
    timer: null, // 保存定时器
    scrollTop: 5, // 设定触发条件的距离
    scrollHeight: 0,

  },

  //onLoad: function () {
  onLoad: function(options) {
    if (!String.isBlank(options)) {
      var cid = options.classid
      var cname = options.name
      wx.setStorage({
        key: "ncid",
        data: cid
      }); //存储到本地
      wx.setStorage({
        key: "ncname",
        data: cname
      }); //存储到本地
    }
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    if (that.data.list.length == 0) {
      page = 1
    } //重新打开时,重置page为1
    wx.getSystemInfo({
        success: function(res) {
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      }),
      wx.setNavigationBarTitle({
        title: '新闻中心'
      }),
      request({
        url: getApp().globalData.url + '/api.php',
        method: 'GET',
        data: {
          appid: getApp().globalData.appid,
          type: 'sort',
          module: 'wechat/news',
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      })
      .then(function(res) {
        that.setData({
          sort: res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    GetList(that);
  },
  bindDownLoad: function() {
    //  该方法绑定了页面滑动到底部的事件  
    var that = this;
    GetList(that);
  },
  scroll: function(event) {
    // 防抖，优化性能
    // 当滚动时，滚动条位置距离页面顶部小于设定值时，触发下拉刷新
    // 通过将设定值尽可能小，并且初始化scroll-view组件竖向滚动条位置为设定值。来实现下拉刷新功能，但没有官方的体验好
    clearTimeout(this.timer)
    if (event.detail.scrollTop < this.data.scrollTop) {
      this.timer = setTimeout(() => {
        this.onLoad()
      }, 350)
    }
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  },
  search: function(e) {
    if (e.detail.value.keywords.length == 0) {
      wx.showToast({
        title: '搜索词不得为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function() {
        wx.hideToast()
      }, 2000)
    } else {
      var bpages = getCurrentPages()
      var bcurrentPage = bpages[bpages.length - 1]
      var burl = bcurrentPage.route
      wx.redirectTo({
        url: "../../pages/news/search?keywords=" + e.detail.value.keywords + "&burl=" + burl
      })
    }
  },
  //下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
  },
  tourl: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.redirectTo({
      url: "../.." + url
    })
  },
  tosort: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.redirectTo({
      url: "../.." + url
    })
  },


})