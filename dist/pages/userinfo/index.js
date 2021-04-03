// pages/user/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonedata:false,
    userphone:""
  },
  bindphone(){
    wx.navigateTo({
      url: '/pages/bindphone/index',
    })
  },
  bindregister(){
    wx.navigateTo({
      url: '/pages/registershowing/index',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.userphone){

      const appuserphone=app.userphone
      this.setData({
        userphone:appuserphone,
        phonedata:true
      })
    }
    // app.userphone=111;
//     var app = getApp();
// var phone=app.globalData.userphone;
// console.log(phone)
// this.setData({
// userphone:phone
// })

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
    const appuserphone=app.userphone;
    this.setData({
      userphone:appuserphone
    })
    if(app.userphone){

      const appuserphone=app.userphone
      this.setData({
        userphone:appuserphone,
        phonedata:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
console.log(4)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
console.log(4)
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