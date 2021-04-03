// pages/main/index.js
//引入发送请求的方法
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catesList:[
      {
        name:"医生",
        image_src:"../../images/医生.png",
        url:"/pages/doctordetail/index"
      },
      {
        name:"病历本",
        image_src:"../../images/病历本.png",
        url:"/pages/binddisease/index"
      },
      {
        name:"附近医院",
        image_src:"../../images/通知广播.png",
        url:"/pages/choosehospital/index"
      },
      {
        name:"预约",
        image_src:"../../images/预约.png",
        url:"/pages/changedepart/index"
      }
    ],
    articleList:[]
  },
  onAriticleDetail(e){
    console.log(1);
    const articleid=e.currentTarget.dataset.wpyonariticledetailA
    wx.navigateTo({
      url: '/pages/ariticledetail/index?articleid='+articleid,
    })
  },
  aap(e){
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCateList();
    this.getarticleList();
  },
  // getCateList(){
  //   request({
  //     url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
  //   }).then(result =>{
  //     this.setData({
  //       catesList:result.data.message
  //     })
  //   })

  getarticleList(){
    request({
      url:"http://localhost:3003/getarticlelist"
    }).then(result =>{
      this.setData({
        articleList:result.data.data
      })
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