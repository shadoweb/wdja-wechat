const app = getApp()
Page({
  data: {
    title: getApp().globalData.title,
    userInfo: {},
    hasUserInfo: false,
    getUserInfoFail: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    this.login();
  },
  onLoad: function () {
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
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          app.globalData.nickName = res.userInfo.nickName
          app.globalData.avatarUrl = res.userInfo.avatarUrl
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res => {
          this.setData({
            getUserInfoFail: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.login();
      //获取授权后跳转到首页
      wx.redirectTo({
        url: "../../pages/index/index"
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      this.openSetting();
    }
  },
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo
            app.globalData.nickName = res.userInfo.nickName
            app.globalData.avatarUrl = res.userInfo.avatarUrl
            that.setData({
              getUserInfoFail: false,
              userInfo: res.userInfo,
              hasUserInfo: true

            })
            //平台登录
            //登录成功后跳转到首页
            wx.redirectTo({
              url: "../../pages/index/index"
            })
          },
          fail: function (res) {
            that.setData({
              getUserInfoFail: true
            })
          }
        })
      }
    })
  },
  //跳转设置页面授权
  openSetting: function () {
    var that = this
    if (wx.openSetting) {
      wx.openSetting({
        success: function (res) {
          //尝试再次登录
          that.login()
        }
      })
    } else {
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
      })
    }
  }
})