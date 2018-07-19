// pages/index/index.js
import {
  request
} from '../../utils/wxRequest';
var WxParse = require('../../pages/wxParse/wxParse');
Page({
  /**
   * 页面的初始数据
   */
  onShareAppMessage: function() {
    var bpages = getCurrentPages()
    var bcurrentPage = bpages[bpages.length - 1]
    var burl = bcurrentPage.route
    return {
      title: getApp().globalData.title,
      path: burl, //'/pages/index/index'
    }
  },
  data: {
    url: getApp().globalData.url,
    //配置tabBar
    tabBar: getApp().globalData.tabBar_index,
    //是否采用衔接滑动  
    circular: true,
    //是否显示画板指示点  
    indicatorDots: false,
    //选中点的颜色  
    indicatorcolor: "#3eb4fa",
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: true,
    //滑动动画时长毫秒  
    duration: 1000,
    //所有图片的高度  
    imgheights: [],
    //图片宽度  
    imgwidth: 750,
    //默认  
    current: 0,
    indicatorDots: true,
    interval: 2000,
    mhome: '首页',
    mproduct: '产品',
    mnews: '新闻',
    mcontact: '联系',
    content: '未录入数据',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    request({
        url: getApp().globalData.url + '/api.php',
        method: 'GET',
        data: {
          appid: getApp().globalData.appid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      })
      .then(function(res) {
        res.data.news.forEach((item) => {
            item.time = item.time.substring(0, 10)
            item.topic = item.topic.substring(0, 30)
          }),
          that.setData({
            slide: res.data.slide,
            product: res.data.product,
            aboutus: res.data.aboutus,
            contact: res.data.contact,
            news: res.data.news
          }),
          WxParse.wxParse('content', 'html', res.data.aboutus[0]['content'], that, 5)
      })
    //.catch(error => console.error(error))
    //获取用户授权
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo //用户基本信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //头像链接
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province //所在省
        var city = userInfo.city //所在市
        var country = userInfo.country //所在国家
      }
    })
  },

  bindTextAreaBlur: function(e) {
    //console.log(e.detail.value);
    var that = this;
    that.setData({
      info: e.detail.value
    });
  },
  bindTextAreaFocus: function(e) {
    //console.log(e.detail.value);
    var that = this;
    that.setData({
      info: e.detail.value
    });
  },
  formSubmit: function(e) {
    var that = this;
    //console.log(e.detail.formId)
    if (e.detail.value.mobile.length == 0) {
      wx.showToast({
        title: '手机号码不得为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function() {
        wx.hideToast()
      }, 2000)
    } else {
      wx.login({
        success: function(res) {
          request({
              url: getApp().globalData.url + '/api.php',
              method: "GET",
              data: {
                type: 'form',
                mobile: e.detail.value.mobile,
                email: e.detail.value.email,
                name: e.detail.value.name,
                info: e.detail.value.info,
                formid: e.detail.formId,
                code: res.code
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
              }
            })
            .then(function(res) {
              console.log(res)
              if (res.data.status == 0) {
                wx.showToast({
                  title: res.data.title,
                  icon: 'loading',
                  duration: 1500
                })
              } else {
                wx.showToast({
                    title: res.data.title,
                    icon: 'success',
                    duration: 1000
                  }),
                  that.setData({
                    form_info: ''
                  })
              }
            })
        }
      })

    }
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
        url: "../../pages/product/search?keywords=" + e.detail.value.keywords + "&burl=" + burl
      })
    }
  },
  imageLoad: function(e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      current: e.detail.current
    })
  },
  tourl: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.redirectTo({
      url: "../.." + url
    })
  },

})