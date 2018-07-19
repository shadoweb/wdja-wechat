// pages/news/index.js
import {
  request
} from '../../utils/wxRequest';
var WxParse = require('../../pages/wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  onShareAppMessage: function () {
    var bpages = getCurrentPages()
    var bcurrentPage = bpages[bpages.length - 1]
    var burl = bcurrentPage.route + '?id=' + wx.getStorageSync('nid') + '&name=' + wx.getStorageSync('nname')
    return {
      title: wx.getStorageSync('nname'),
      path: burl
    }
  },
  data: {
    url: getApp().globalData.url,
    //配置tabBar
    tabBar: getApp().globalData.tabBar_news,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var name = options.name
    var that = this
    wx.setStorage({ key: "nid", data: id });//存储到本地
    wx.setStorage({ key: "nname", data: name });//存储到本地
    request({
      url: getApp().globalData.url + '/api.php',
      method: 'GET',
      data: {
        type: 'detail',
        module: 'wechat/news',
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
    })
      .then(function (res) {
        that.setData({
          newss: res.data
        })
        WxParse.wxParse('content', 'html', res.data[0]['content'], that, 5);
      }
    )
      wx.setNavigationBarTitle({
        title: name
      }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3eb4fa',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
  },
  
  tourl: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.redirectTo({
      url: "../.." + url
    })
  },

})