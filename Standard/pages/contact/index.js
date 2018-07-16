// pages/contact/index.js
var WxParse = require('../../pages/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  onShareAppMessage: function () {
    var bpages = getCurrentPages()
    var bcurrentPage = bpages[bpages.length - 1]
    var burl = bcurrentPage.route
    return {
      title: getApp().globalData.contact,
      path: burl,//'/pages/index/index'
    }
  },
  
  data: {
    url: getApp().globalData.url,
    //配置tabBar
    tabBar: getApp().globalData.tabBar_contact,
    latitude: 22.71591,//res.latitude, // 纬度，范围为-90~90，负数表示南纬
    longitude: 114.03268,//res.longitude, // 经度，范围为-180~180，负数表示西经
    scale: 18, // 缩放比例5-18
    markers: [{
      title: 'WDJA网站管理系统',
      iconPath: "../../pages/template/img/marker_red.png",
      id: 0,
      latitude: 22.71591,
      longitude: 114.03268,
      width: 32,
      height: 32
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().globalData.url + '/api.php',
      method: 'GET',
      data: {
        type:'singlepage',
        module:'wechat/contact'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
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

  openMap: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        console.log(res.latitude)
        console.log(res.longitude)
        wx.openLocation({
          latitude: 22.71591,//res.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: 114.03268,//res.longitude, // 经度，范围为-180~180，负数表示西经
          scale: 18, // 缩放比例5-18
          name: 'WDJA网站管理系统',
          address: '深圳市龙华区观澜福前路豪亚花园'          
        })
      }
    })
  },


})