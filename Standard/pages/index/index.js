// pages/index/index.js
import { String } from '../../utils/util.js';
var WxParse = require('../../pages/wxParse/wxParse');
import {Promisify} from '../../utils/Promisify';
const request = Promisify(wx.request);
const showToast = Promisify(wx.showToast);
const login = Promisify(wx.login);
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
    console.log(getApp().globalData.userInfo)
    console.log(getApp().globalData.openid)
    console.log("登录状态:"+getApp().globalData.wxlogin_code)
    var that = this
    request({
        url: getApp().globalData.url + '/api.php',
        method: 'GET',
      data: {
          appid: getApp().globalData.appid,
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
            openid: getApp().globalData.openid,
            nickName: getApp().globalData.nickName,
            avatarUrl: getApp().globalData.avatarUrl,
            gender: getApp().globalData.gender,
            city: getApp().globalData.city,
            slide: res.data.slide,
            product: res.data.product,
            aboutus: res.data.aboutus,
            contact: res.data.contact,
            news: res.data.news
          }),
          WxParse.wxParse('content', 'html', res.data.aboutus[0]['content'], that, 5)
      })
    //.catch(error => console.error(error))

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
    if (String.isBlank(getApp().globalData.userInfo)) {
      showToast({
        title: '请先登录!',
        icon: 'loading',
        duration: 1000
      }).then(setTimeout(function () {
          wx.redirectTo({
            url: "../../pages/index/getuserinfo"
          })
      }, 2000)
      )
    }else{
    //console.log(e.detail.formId)
    if (e.detail.value.mobile.length == 0) {
      showToast({
        title: '手机号码不得为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function() {
        wx.hideToast()
      }, 2000)
    } else {
      login({
      }).then(function(res) {
          request({
              url: getApp().globalData.url + '/api.php',
              method: "GET",
              data: {
                type: 'form',
                appid: getApp().globalData.appid,
                openid: e.detail.value.openid,
                nickName: e.detail.value.nickName,
                avatarUrl: e.detail.value.avatarUrl,
                gender: e.detail.value.gender,
                city: e.detail.value.city,
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
              //console.log(res)
              if (res.data.status == 0) {
                wx.showToast({
                  title: res.data.title,
                  icon: 'loading',
                  duration: 1500
                })
              } else {
                showToast({
                    title: res.data.title,
                    icon: 'success',
                    duration: 1000
                  })
                  that.setData({
                    form_info: ''
                  })
              }
            })
        })

    }
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