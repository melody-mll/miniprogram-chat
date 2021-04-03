// pages/changedepart/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerinformation:{
      departname:""
    },
    list:[],
    url:""
  },
  nextStep(e){
    console.log(e);
    const propdepartname=e.currentTarget.dataset.wpynextstepA.depart
    this.setData({
      registerinformation:{
        departname:propdepartname
      },
    }),
    this.setData({
      url:"/pages/changeproject/index?departname="+propdepartname
    })
    // console.log(item);
    // console.log(this.data.registerinformation.departname)
    // console.log(this.registerinformation.departname);
    // console.log(e);
    // console.log(e.target.dataset.wpynextstepA.departname);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gedepartList();
  },
  gedepartList(){
    request({
      url:"http://localhost:3003/getdepartlist"
    }).then(result =>{
      // console.log(result)
      this.setData({
        list:result.data.data
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