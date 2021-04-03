// pages/bindphone/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonedata:false,//默认电话号码为空，显示输入框
    patientphone:"",
    error:0,
    confirmform:false//默认绑定的手机号可以修改
  },
  getPhoneNumber (e) {
    this.setData({
      error:0
    })
    if(!this.data.patientphone){
      wx.showToast({
        title: '手机号码为空',
        duration: 3000,
        icon:'none'
        });
        this.setData({
          error:1
        })
        }else{
          const nowerror=this.data.error+0;
          this.setData({
            error:0
          })
        }
   if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.patientphone))) {
      wx.showToast({
      title: '电话号码有误',
      duration: 3000,
      icon:'none'
      })
      this.setData({
        error:1
      })
    }else{
      this.setData({
        error:0
      })
    }
    if(this.data.error==0){
      wx.showToast({
        title: '绑定成功',
        duration: 3000,
        icon:'none'
        })
     this.setData({
       confirmform:true
     })
     app.userphone=this.data.patientphone;
    }
    console.log(app.userphone);

 
  },
  blured(e){
    this.setData({
      patientphone:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if(app.userphone){
      this.setData({
        phonedata:true,
        patientphone:app.userphone,
        confirmform:true
      })
    }
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