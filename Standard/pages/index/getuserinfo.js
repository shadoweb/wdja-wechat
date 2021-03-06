const app = getApp()
import { String } from '../../utils/util.js';
import {
  Promisify
} from '../../utils/Promisify';
var config = require('../../config')
const request = Promisify(wx.request);
const login = Promisify(wx.login);
const getUserInfo = Promisify(wx.getUserInfo);
const showModal = Promisify(wx.showModal);
Page({
  data: {
    title: getApp().globalData.title,
    userInfo: {},
    hasUserInfo: false,
    getUserInfoFail: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    this.login();
  },
  onLoad: function (options) {
    this.login();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        app.globalData.nickName = res.userInfo.nickName
        app.globalData.avatarUrl = res.userInfo.avatarUrl
        app.globalData.gender = res.userInfo.gender
        app.globalData.city = res.userInfo.city
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      getUserInfo({
      }).then(res => {
          app.globalData.userInfo = res.userInfo
          app.globalData.nickName = res.userInfo.nickName
          app.globalData.avatarUrl = res.userInfo.avatarUrl
          app.globalData.gender = res.userInfo.gender
          app.globalData.city = res.userInfo.city
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }).catch( res => {
          this.setData({
            getUserInfoFail: true
          })
        })
    }
  },
  getUserInfo: function (e) {
    var burl = "../../pages/index/index"; 
    if (!String.isBlank(wx.getStorageSync('burl'))) {
      burl = "../../" + wx.getStorageSync('burl'); 
    }
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.login();
      //获取授权后跳转到首页
      wx.redirectTo({
        url: burl
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      this.openSetting();
    }
  },
  login: function() {
    var that = this;
    var burl = "../../pages/index/index";
    if (!String.isBlank(wx.getStorageSync('burl'))) {
      burl = "../../" + wx.getStorageSync('burl');
    }
    login({

    }).then(function(res) {
        var code = res.code;
        //
        request({
            url: config.service.host + '/api.php',
            data: {
              appid: getApp().globalData.appid,
              code: code,
              type: 'wxlogin'
            }
          })
          .then(function(res) {
            //console.log(res.data)
            wx.setStorage({
              key: "sessionid",
              data: res.data.sessionid
            }); //存储到本地
            var openid = res.data.openid;
            app.globalData.openid = openid;
          })
        //
        getUserInfo({
        }).then(function (res) {
            //console.log(res.encryptedData)
            app.globalData.userInfo = res.userInfo
            app.globalData.nickName = res.userInfo.nickName
            app.globalData.avatarUrl = res.userInfo.avatarUrl
            app.globalData.gender = res.userInfo.gender
            app.globalData.city = res.userInfo.city
            that.setData({
              getUserInfoFail: false,
              userInfo: res.userInfo,
              hasUserInfo: true,
              burl: burl

            })
            //平台登录
            //登录成功后跳转到首页
            wx.redirectTo({
              url: burl
            })
          }).catch(function(res) {
            that.setData({
              getUserInfoFail: true
            })
          })
      })
  },
  //跳转设置页面授权
  openSetting: function() {
    var that = this
    if (wx.OpenSetting) {
      wx.OpenSetting({
        success: function(res) {
          that.login()
        }
      })
    } else {
      showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
      })
    }
  }
})