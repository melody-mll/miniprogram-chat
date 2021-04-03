// pages/cityselect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    country:" ",
    ad_code:" ",
    lat: " ",
    lng: " ",
    position: " ",
    position_code: " ",
    isTap:false
  },
  getPosition() {
    wx.showToast({
      title: '定位中…',
      icon: 'loading'
    })
    // 实例化API核心类
    var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'B45BZ-Q6FW6-U73SF-MFZUS-VNWSO-4TF2Q' // 必填
    });
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口        
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            // console.log(res.data);
            var position = "";
            if (res.result.ad_info.district) {
              position = res.result.ad_info.district;
            } else {
              position = res.result.ad_info.city;
            }
            _this.setData({
              position: position,
              position_code: res.result.ad_info.adcode,
              lat: res.result.location.lat,
              lng: res.result.location.lng,
              isTap: true
            });
            console.log(_this.data,'123')
          }
        })
      }
    });
  },
  positionTap(){
    wx.navigateTo({
      url: '/pages/choosehospital/index'
    })
  },
  hefei(){
    this.setData({
      country:"合肥",
      latitude:31.827314,
      longitude:117.234016,
    })
    wx.navigateTo({
      url: '/pages/choosehospital/index?country='+this.data.country+"&latitude="+this.data.latitude+"&longitude="+this.data.longitude
    })
  },
  beijing(){
    this.setData({
      country:"北京",
      latitude:39.913359,
      longitude:116.408213
    })
    wx.navigateTo({
      url: '/pages/choosehospital/index?country='+this.data.country+"&latitude="+this.data.latitude+"&longitude="+this.data.longitude
    })
  },
  nanjing(){
    this.setData({
      country:"南京",
      latitude:32.068324,
      longitude:118.803572,
    })
    wx.navigateTo({
      url: '/pages/choosehospital/index?country='+this.data.country+"&latitude="+this.data.latitude+"&longitude="+this.data.longitude
    })
  },
  shenzheng(){
    this.setData({
      country:"深圳",
      latitude:22.549257,
      longitude:114.065127,
    })
    wx.navigateTo({
      url: '/pages/choosehospital/index?country='+this.data.country+"&latitude="+this.data.latitude+"&longitude="+this.data.longitude
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      country:options.country
    })
    this.getPosition();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})