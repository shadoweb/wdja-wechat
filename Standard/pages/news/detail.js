// pages/news/index.js
import { String } from '../../utils/util.js';
var WxParse = require('../../pages/wxParse/wxParse');
import { Promisify } from '../../utils/Promisify';
const request = Promisify(wx.request);
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
    shareImg: null,
    shareHidden: true,
  
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

    wx.getUserInfo({
      success: res => {
        this.setData({
          name: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success: function (res) {
            if (res.statusCode === 200) {
              that.setData({
                avatarImg: res.tempFilePath
              })
            }
          }
        })
      }
    })
  },

  //点击生成
  share: function (e) {
    var that = this;
    that.setData({
      shareHidden: true
    })
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 3000
    });
    setTimeout(function () {
      wx.hideToast()
      //that.createNewImg();
      String.createNewImg(that, that.data.title, that.data.info, that.data.avatarImg);
      that.setData({
        shareHidden: false,
        shareImg: that.data.shareImg,
      })
    }, 3000)
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
            if (res.confirm) {
            }
            that.setData({
              shareHidden: true
            })
          }, fail: function (res) {
          }
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