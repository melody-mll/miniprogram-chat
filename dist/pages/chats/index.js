// pages/chats/index.js
const app=getApp();
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],//表示已经绑定的病历信息
    phonedata:false,//默认用户手机没有绑定状态
    patientphone:"",
    clinicdate: "",
    diseasedetail: "",
    diseasename: "",
    isbinding: "",
    patientage: "",
    patientid: "",
    patientname: "",
    patientsex: ""
  },
  informationdetailEvent(e){
    console.log(e)
    const nowinfo=e.currentTarget.dataset.wpynavigateeventA;
    // this.setData({
    //   patientphone:nowinfo.patientphone,
    //   clinicdate: nowinfo.clinicdate,
    //   diseasedetail: nowinfo.diseasedetail,
    //   diseasename: nowinfo.diseasename,
    //   isbinding: nowinfo.isbinding,
    //   patientage: nowinfo.patientage,
    //   patientid: nowinfo.patientid,
    //   patientname: nowinfo.patientname,
    //   patientsex: nowinfo.patientsex
    // })
    wx.navigateTo({
      url: '/pages/diseasedetail/index?patientname='+nowinfo.patientname+"&patientsex="+nowinfo.patientsex+"&patientage="+nowinfo.patientage+"&patientphone="+nowinfo.patientphone+"&diseasename="+nowinfo.diseasename+"&diseasedetail="+nowinfo.diseasedetail+"&clinicdate="+nowinfo.clinicdate+"&patientid="+nowinfo.patientid,
    })
    
  },
  scanQRcodEvent(){
    wx.navigateTo({
      url: '/pages/bindpatientdisease/index',
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
    this.getbindpatientinfoList();
  },
  getbindpatientinfoList(){
    const params=this.data.patientphone;
    console.log(params)
    request({
      url:"http://localhost:3003/getbindpatientinfoList",
      data:{
        patientphone:params,
        isbinding:1
      },
    }).then(result =>{
      this.setData({
        recordList:result.data.data
      })
     
    })
  },
  //在页面加载之前，向后端发送请求，得到自己的绑定病历


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