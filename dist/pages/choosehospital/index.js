// pages/choosehospital/index.js
import {request} from "../../request/index";
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    country: " ",
    ad_code:" ",
    lat: " ",
    lng: " ",
    keyword:"",
    caseData:[
      // {
      //   address: "六安市皖西学院",
      //   distance: 906566.2,
      //   id: "11",
      //   level: 5,
      //   name: "皖西学院校卫生室",
      //   picture: "https://fmsai.oss-cn-hangzhou.aliyuncs.com/remark/120210316/f8b2d09790ffe939de2a9ab6b11cb94.png",
      //   star: 3,
      //   type: null,
      //   video: 1
      // },
      // {
      //   address: "六安市金安区皖西西路21号",
      //   distance: 908409,
      //   id: "1",
      //   level: 1,
      //   name: "六安市人民医院",
      //   picture: "https://poi-pic.cdn.bcebos.com/d10374cf4161f195dcaf44f2e078fc22.jpg",
      //   star: 5,
      //   type: null,
      //   video: 1
      // }
    ],
    items1:[
      {
        picture: "https://cxy20190409.oss-cn-hangzhou.aliyuncs.com/2021/48651305934b5bd490630cc972dbf75.png"
      },{
        picture: "https://cxy20190409.oss-cn-hangzhou.aliyuncs.com/2021/5a9dc52152eee820ed358f261101c3c.png"
      },{
        picture: "https://cxy20190409.oss-cn-hangzhou.aliyuncs.com/2021/c2fe412802b9065303f46c169124d4b.png"
      },{
        picture: "https://cxy20190409.oss-cn-hangzhou.aliyuncs.com/2021/65d013709f8b199797d90dfbcbd6a48.png"
      },{
        picture: "https://cxy20190409.oss-cn-hangzhou.aliyuncs.com/2021/76f371422d74f415a5f6f4db489763b.png"
      },{
        picture: "https://cxy20190409.oss-cn-hangzhou.aliyuncs.com/2021/e4f3096b8acb475a6a8398dc47bfdc2.png"
      },{
        picture: "https://fmsai.oss-cn-hangzhou.aliyuncs.com/remark/120210316/8913bdf31a021650880181840f42a62.png"
      }
    ]


  },
  showIndexList(){
    wx.navigateTo({
      url: '/pages/cityselect/index?country='+this.data.country
    })
  },
  getPosition() {
    wx.showToast({
      title: '定位中…',
      icon: 'loading'
    })
    // 实例化API核心类
    var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
    var qqmapsdk = new QQMapWX({
      key: 'B45BZ-Q6FW6-U73SF-MFZUS-VNWSO-4TF2Q' // 必填
    });
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口        
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            wx.hideToast()
            //获取市名称
            var position = "";
            if (res.result.ad_info.district) {
              position = res.result.ad_info.district;
            } else {
              position = res.result.ad_info.city;
            }
            _this.setData({
              country: position.length > 5 ? position.substring(0, 4) + '...' : position,
              ad_code: res.result.ad_info.adcode,
              lat: res.result.location.lat,
              lng: res.result.location.lng
            });
            console.log(_this.data,'country');
            _this.getdistance();

            // _this.fetchSchoolList(1, _this.data.lat, _this.data.lng, true)
          },

        })
      },
      fail: function(res) {
        wx.hideToast()
        wx.showModal({
          title: '温馨提示',
          content: '位置授权失败，部分功能将不能使用，是否重新授权？',
          showCancel: false,
          confirmText: "授权",
          success: function (res) {
            if (res.confirm) {
              if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting["scope.userLocation"]) { //如果用户重新同意了位置授权
                      wx.getLocation({
                        type: 'wgs84',
                        success: function (res) {
                          var latitude = res.latitude
                          var longitude = res.longitude
                          // 调用接口        
                          qqmapsdk.reverseGeocoder({
                            location: {
                              latitude: latitude,
                              longitude: longitude
                            },
                            success: function (res) {
                              var position = "";
                              if (res.result.ad_info.district) {
                               var position = res.result.ad_info.district;
                              } else {
                               var  position = res.result.ad_info.city;
                              }
                              _this.setData({
                                country: position.length > 5 ? position.substring(0, 4) + '...' : position,
                                ad_code: res.result.ad_info.adcode,
                                lat: res.result.location.lat,
                                lng: res.result.location.lng
                              });

                              // _this.fetchSchoolList(1, _this.data.lat, _this.data.lng, true)
                            }
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          }
        })
      }
    })
  },
  getdistance(){
    const lat1=this.data.lat;
    const lng1=this.data.lng;
    console.log(this.data,'0909')
    request({
      url:"http://localhost:3003/getdistance",
      data:{
        lat1:this.data.lat,
        lng1:this.data.lng
      },
      method:"GET"
    }).then(result =>{
      console.log(result)
      this.setData({
        caseData:result.data.data
      })
    })
  },
  gethospitallist(){
    request({
      url:"http://localhost:3003/gethospitallist",
      data:{
        name:this.data.keyword,
        lat:this.data.lat,
        lng:this.data.lng
      },
      method:"GET"
    }).then(result =>{
       console.log(result)
      this.setData({
        caseData:result.data.data
      })
      if(result.data.data.length==0){
        wx.showToast({
          title: "未找到相关医院",
          duration: 3000,
          icon:'none'
          });  
      }
    })
  },
  onTapSearch(){
    this.gethospitallist();
  },
  handleinput(e){
    this.setData({
      keyword:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options')
    if(JSON.stringify(options) == "{}"){
      console.log('222')
      this.getPosition();
    }else{
      this.setData({
        country:options.country,
        lat:options.latitude,
        lng:options.longitude
      })
      this.getdistance()
    }
    // var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
    // this.getPosition(); //定位
    //this.getdistance();

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
    //this.getdistance();
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