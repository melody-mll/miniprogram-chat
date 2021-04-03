// pages/bindpatientdisease/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arraypicker:['男','女'],
    index:0,
    patientname:"",
    patientsex:"男",
    patientphone:"",
    patientid:"",
    clinicdate:""
  },
  blured(e){
    const blurtarget=e.target.dataset.wpybluredA;
    const blurdetail=e.detail.value;
    if(blurtarget == 'name'){
      this.setData({
        patientname:blurdetail
      })
    }if(blurtarget == 'phone'){
      this.setData({
        patientphone:blurdetail
      })
    }if(blurtarget == 'id'){
      this.setData({
        patientid:blurdetail
      })
    }if(blurtarget == 'date'){
      this.setData({
        clinicdate:blurdetail
      })
    }
  },
  changepicker(e){
    console.log(this.data);
    this.setData({
      index:e.detail.value
    });
    const arr=this.data.arraypicker;
    const eindex=this.data.index;
    const targetsex=arr[eindex];
    this.setData({
      patientsex:targetsex
    })
  },
  tapNextBtn(){
    //确定的时候向后端发请求，表示是否有该数据未绑定
    const patientname=this.data.patientname
    const patientsex=this.data.patientsex
    const patientphone=this.data.patientphone
    const patientid=this.data.patientid
    const clinicdate=this.data.clinicdate
      request({
        //对于绑定病历信息，来进行绑定
        //进行更新isbinding为1
        url:"http://localhost:3003/savebindinginformation",
        data:{
          patientname:patientname,
          patientsex:patientsex,
          patientphone:patientphone,
          patientid:patientid,
          clinicdate:clinicdate
        },
        method:"GET"
      }).then(result =>{
        const message=result.data.message
        wx.showToast({
          title: message,
          duration: 3000,
          icon:'none'
          });  
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