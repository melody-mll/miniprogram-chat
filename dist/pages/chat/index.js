// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html:'',
    gender:"",
    msg:"hello world",
    num:0,
    fruitlist:[],
    list:[
      {
        id:0,
        name:"111",
        value:"apple"
      },
      {
        id:1,
        name:"222",
        value:"banana"
      },{
        id:2,
        name:"333",
        value:"grape"
      }
    ]
  },
  handleinput(e){
    this.setData({
      num:e.detail.value
    })
  },
  handlechange(e){
    if(e.detail.value == "male"){
      this.setData({
        gender:"男"
      })
    }else this.setData({
      gender:"女"
    })
  },
  handleitemchange(e){
    const fruitlist=e.detail.value;
    this.setData({
      fruitlist
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