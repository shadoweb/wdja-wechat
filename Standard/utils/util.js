const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
function createNewImg(that, title, info, avatarimg) {
  var context = wx.createCanvasContext('shareImg');
  context.setFillStyle("#ffffff")
  context.fillRect(0, 0, 375, 567)
  var path5 = "../../pages/template/img/weixin.png";
  var name = getApp().globalData.nickName;
  context.rect(20, 70, 335, 300) //画出矩形
  //绘制标题
  context.setFontSize(18);
  context.setFillStyle('#333333');
  context.setTextAlign('center');
  context.fillText(title, 175, 40);
  context.stroke();
  //绘制内容
  canvasTextAutoLine(info, context,30, 100,24);
  //绘制名字
  context.setFontSize(16);
  context.setFillStyle('#333333');
  context.setTextAlign('center');
  context.fillText(name, 90, 525);
  context.stroke();
  //绘制邀请标语
  context.setFontSize(16);
  context.setFillStyle('#333333');
  context.setTextAlign('center');
  context.fillText("邀请你一起看一看", 90, 550);
  context.stroke();
  //绘制二维码标语
  context.setFontSize(18);
  context.setFillStyle('#333333');
  context.setTextAlign('center');
  context.fillText("长按识别小程序", 280, 540);
  context.stroke();
  //绘制小程序二维码
  context.drawImage(path5, 228, 406, 100, 100);
  //绘制头像
  context.arc(86, 456, 50, 0, 2 * Math.PI);
  context.strokeStyle = "#ffe200";
  context.clip();
  context.drawImage(avatarimg, 36, 406, 100, 100);
  context.draw();
  //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
  setTimeout(function () {
    wx.canvasToTempFilePath({
      canvasId: 'shareImg',
      success: function (res) {
        that.setData({
          shareImg: res.tempFilePath
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }, 200);
}
/**
str:要绘制的字符串
canvas:canvas对象
initX:绘制字符串起始x坐标
initY:绘制字符串起始y坐标
lineHeight:字行高，自己定义个值即可
*/
function canvasTextAutoLine(str,canvas,initX,initY,lineHeight){
    var ctx = canvas; 
    var lineWidth = 0;
    var canvasWidth = 330;
    var lastSubStrIndex= 0; 
    for(let i=0;i<str.length;i++){ 
        lineWidth+=ctx.measureText(str[i]).width; 
      if (lineWidth > canvasWidth - initX) {//减去initX,防止边界出现的问题
            ctx.setTextAlign('left');
            ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
            initY+=lineHeight;
            lineWidth=0;
            lastSubStrIndex=i;
        } 
        if(i==str.length-1){
            ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
        }
    }
  }

/**
 * 用于判断空，Undefined String Array Object
 */
function isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }
}

/**
 * 导出
 */
module.exports = {
  formatTime: formatTime,
  String: {
    isBlank: isBlank,
    canvasTextAutoLine:canvasTextAutoLine,
    createNewImg: createNewImg
  }
}