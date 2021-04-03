// pages/hospitaldetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    companyId: "",
    level: "",
    name: "",
    picture: "",
    star: "",
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111)
    console.log(options,'0000')
    this.setData({
      address: options.address,
      companyId: options.companyId,
      level: options.level,
      name: options.name,
      picture: options.picture,
      star: options.star
    })
    if(this.data.star == 0){
      this.setData({
        url:'../../images/sku_star0.png'
      })
    }
    if(this.data.star == 1){
      this.setData({
        url:'../../images/sku_star10.png'
      })
    }
    if(this.data.star == 2){
      this.setData({
        url:'../../images/sku_star20.png'
      })
    }
    if(this.data.star == 3){
      this.setData({
        url:'../../images/sku_star30.png'
      })
    }
    if(this.data.star == 3.5){
      this.setData({
        url:'../../images/sku_star35.png'
      })
    }
    if(this.data.star == 4){
      this.setData({
        url:'../../images/sku_star40.png'
      })
    }
    if(this.data.star == 4.5){
      this.setData({
        url:'../../images/sku_star45.png'
      })
    }
    if(this.data.star == 5){
      this.setData({
        url:'../../images/sku_star50.png'
      })
    }
    console.log(this.data.url,'url')

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