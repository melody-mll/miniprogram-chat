// pages/changedate/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorname:"",
    docid:"",
    dateIndex:"",
    departname:"",
    projectname:"",
    showname:false,
    list:[]

  },
  appointment(e){
    const ecurrent=e.currentTarget.dataset.wpyappointmentA;
    wx.navigateTo({
      url: '/pages/registerinformation/index?doctorname='+this.data.doctorname+"&departname="+this.data.departname+"&projectname="+this.data.projectname+"&registrationFee="+ecurrent.registrationFee+"&registrationNum="+ecurrent.registrationNum+"&residueNum="+ecurrent.residueNum+"&scheduleDate="+ecurrent.scheduleDate+"&week="+ecurrent.week
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    // if(options.name){
    //   this.setData({
    //     doctorname:options.name
    //   })
    // }else{
    //   this.setData({
    //     doctorname:options.doctorname
    //   })
    // }
      this.setData({
        doctorname:options.doctorname,
        dateIndex:options.dateIndex,
        departname:options.departname,
        projectname:options.projectname,
        name:options.name
      })
      if(!options.doctorname){
        console.log(this.data)
        this.setData({
          doctorname:options.name
        })
        console.log(this.data)
      }

  console.log(this.data);
    this.getdetailList();
  },
  getdetailList(){
    console.log(this.data)
    request({
      url:"http://localhost:3003/getschedulebydoc",
      data:{
        dateIndex:this.data.dateIndex,
        departname:this.data.departname,
        projectname:this.data.projectname,
        doctorname:this.data.doctorname,
        name:this.data.name
      },
      method:"GET"
    }).then(result =>{
      console.log(11)
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
    if(!this.data.doctorname){
      this.setData({
        doctorname:this.data.name
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