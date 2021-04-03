// pages/changeproject/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departname:"",
    projectname:"",
    list:[],
    url:""
  },
  nextStep(e){
    // console.log(e.currentTarget.dataset.wpynextstepA.projectname);
    const projectname=e.currentTarget.dataset.wpynextstepA.projectname
    this.setData({
      projectname:projectname
    }),
    this.setData({
      url:"/pages/changedoctor/index?departname="+this.data.departname+"&projectname="+projectname
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const propsdepartname=options.departname;
    this.setData({
      departname:propsdepartname
    }),
    this.getprojectList();
  },
  getprojectList(){
    const params=this.data.departname;
    console.log(this.data.departname)
    request({
      url:"http://localhost:3003/getprojectlist",
      data:{
        projectdep:params
      },
      method:"GET"
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