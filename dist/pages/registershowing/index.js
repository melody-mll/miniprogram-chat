// pages/registershowing/index.js
const app=getApp();
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    patientphone:'',
    listlength:false,
    phonedata:false//默认用户手机没有绑定状态
  },
  tap(e){
    console.log(e);
    const nowinformation=e.currentTarget.dataset.wpytapA;
    wx.navigateTo({
      url: '/pages/registerdetail/index?departname='+nowinformation.departname+"&doctorname="+nowinformation.doctorname+"&patientid="+nowinformation.patientid+"&patientname="+nowinformation.patientname+"&patientphone="+nowinformation.patientphone+"&patientsex="+nowinformation.patientsex+"&projectname="+nowinformation.projectname+"&registerFee="+nowinformation.registerFee+"&registerdate="+nowinformation.registerdate,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.userphone){
      const patientphone=app.userphone;
      this.setData({
        phonedata:true,
        patientphone:patientphone
      })
    }
    console.log(123);
    this.getregisterList();
  },
  // getregisterList(){
  //   request({
  //     url:"http://localhost:3003/getregisterinformation"
  //   }).then(result =>{
  //     const list=result.data.data;
  //     this.setData({
  //       list:list
  //     })
  //   }) 
  // },
  getregisterList(){
    request({
      url:"http://localhost:3003/getregisterinformation",
      data:{
        patientphone:this.data.patientphone
      }
    }).then(result =>{
      this.setData({
        list:result.data.data
      })
      if(this.data.list.length!=0){
        this.setData({
          listlength:true
        })
      }
      console.log(this.data.list)
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
    if(app.userphone){
      const patientphone=app.userphone;
      this.setData({
        phonedata:true,
        patientphone:patientphone
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