// pages/diseasedetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientphone:"",
    clinicdate: "",
    diseasedetail: "",
    diseasename: "",
    patientage: "",
    patientid: "",
    patientname: "",
    patientsex: ""
  },
  subscribeMessageEvent(){
    wx.navigateTo({
      url: '/pages/consultingrecord/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patientphone:options.patientphone,
      clinicdate: options.clinicdate,
      diseasedetail: options.diseasedetail,
      diseasename: options.diseasename,
      patientage: options.patientage,
      patientname: options.patientname,
      patientsex: options.patientsex,
      patientid:options.patientid
    })

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