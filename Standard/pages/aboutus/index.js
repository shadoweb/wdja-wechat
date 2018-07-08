// pages/aboutus/index.js
var WxParse = require('../../pages/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
  //配置tabBar
    tabBar: getApp().globalData.tabBar_aboutus,
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.request({
      url: getApp().globalData.url + '/api.php',
      method: 'GET',
      data: {
        type: 'singlepage',
        module: 'wechat/aboutus'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
         that.setData({
           items: res.data
        })
        WxParse.wxParse('content', 'html', res.data[0]['content'], that, 5);
      }
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