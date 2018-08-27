// pages/news/index.js
import { String } from '../../utils/util.js';
var WxParse = require('../../pages/wxParse/wxParse');
import { Promisify } from '../../utils/Promisify';
const request = Promisify(wx.request);
const showToast = Promisify(wx.showToast);
const login = Promisify(wx.login);
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
    shareHidden: true,
    name: "",
    touxiang: ""
  
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
    console.log(getApp().globalData.openid)
    request({
      url: getApp().globalData.url + '/api.php',
      method: 'GET',
      data: {
        appid: getApp().globalData.appid,
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
          newss: res.data,
          title: res.data[0]['topic'],
          info: res.data[0]['description']
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

  //点击生成
  share: function (e) {
    var that = this;
    if (String.isBlank(getApp().globalData.userInfo)) {
      showToast({
        title: '请先登录!',
        icon: 'loading',
        duration: 1000
      }).then(setTimeout(function () {
        var bpages = getCurrentPages()
        var bcurrentPage = bpages[bpages.length - 1]
        var burl = bcurrentPage.route + '?id=' + wx.getStorageSync('nid') + '&name=' + wx.getStorageSync('nname')
        wx.setStorage({ key: "burl", data: burl });//存储到本地
        wx.redirectTo({
          url: "../../pages/index/getuserinfo"
        })
      }, 2000)
      )
    } else {
      wx.getUserInfo({
        success: res => {
          this.setData({
            name: res.userInfo.nickName,
          })
          wx.downloadFile({
            url: res.userInfo.avatarUrl,
            success: function (res) {
              that.setData({
                touxiang: res.tempFilePath
              })
            }
          })
        }
      })
    that.setData({
      shareHidden: true
    })
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      //that.createNewImg();
      String.createNewImg(that, that.data.title, that.data.info, that.data.name, that.data.touxiang);
      that.setData({
        shareHidden: false,
      })
    }, 1000)
  }
  },

  //点击保存到相册
  sharesave: function (e) {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) { }
            that.setData({
              shareHidden: true
            })
          },
          fail: function (res) { }
        })
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