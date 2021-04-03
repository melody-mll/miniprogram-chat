// pages/changedoctor/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateType: false,
    doctorList: [],
    departname:"",
    projectname:"",
    weekArr:[],
    dateArr:[],
    dateIndex: 0,
    weekStr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    senddata:''//表示传递的日期信息
    // dateflag:false
  },
  changeType(){
    if(this.data.dateType){
      this.getdoctorList()
    }else{
      this.setData({
        dateIndex:0
      })
      this.getdoctordateList()
    }
    this.setData({
      dateType:!this.data.dateType,
    })
  },
  getListByDate(e){
    console.log('e',e);
    const dataindex=e.currentTarget.dataset.wpygetlistbydateA;
    const senddata=this.data.dateArr[dataindex];
    console.log('data',this.data);
    //通过传递日期信息去得到预约信息
    const eindex=e.currentTarget.dataset.wpygetlistbydateA;
    this.setData({
      dateIndex:eindex,
      senddata:senddata
    });
    this.getdoctordateList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      departname:options.departname,
      projectname:options.projectname
    }),
    console.log(this.data);
    this.getdoctorList();
    this.init();
    // console.log(options.departname);
    // console.log(options.projectname);
  }, 
  init(){
    var listData=[];
    var weekData=[];
    for (var i = 0; i < 7; i++) {
     
      var d = new Date();
      d.setDate(d.getDate() + i);
      d = new Date(d);
      // console.log('d.toLocaleDateString() :', d.toLocaleDateString());
      var month = (d.getMonth() + 1 + '').padStart(2, '0');
      var day = (d.getDate() + '').padStart(2, '0');
      var year = d.getFullYear();
      listData[i]=month + '-' + day;
      weekData[i]=d.getDay();
      
      this.setData({
        dateArr:listData,
        weekArr:weekData
      })

      // for(var j=this.data.dateArr.length;j<this.data.dateArr.length+1;j++){
      //   var listData=[];
      //   listData[j]=month + '-' + day;
      //   this.setData({
      //     dateArr:listData
      //   })
      // }
      // this.data.dateArr.push(month + '-' + day);
      // this.data.weekArr.push(d.getDay());
      // this.completeDateArr.push(year + '-' + month + '-' + day);
      // console.log(this.dateArr);
      // console.log(dateArr);
      // console.log(this.data.dateArr);
    }
  },
  selectDoctor(e){
    console.log('111',e);
    if(e.currentTarget.dataset.wpyselectdoctorA.name){
      wx.navigateTo({
        url: '/pages/changedate/index?doctorname='+e.currentTarget.dataset.wpyselectdoctorA.name+"&docid="+e.currentTarget.dataset.wpyselectdoctorA.docid+"&dateIndex="+this.data.dateIndex+"&departname="+this.data.departname+"&projectname="+this.data.projectname+"&name="+e.currentTarget.dataset.wpyselectdoctorA.name,
      })
    }else{
      wx.navigateTo({
        url: '/pages/changedate/index?doctorname='+e.currentTarget.dataset.wpyselectdoctorA.doctorname+"&docid="+e.currentTarget.dataset.wpyselectdoctorA.docid+"&dateIndex="+this.data.dateIndex+"&departname="+this.data.departname+"&projectname="+this.data.projectname+"&name="+e.currentTarget.dataset.wpyselectdoctorA.name,
      })
    }
    
    //选择医生时获取排版信息
  },
  getdoctorList(){
    // const params=this.data.departname
    request({
      url:"http://localhost:3003/getregisterdoclist",
      data:{
        departname:this.data.departname,
        projectname:this.data.projectname
      },
      method:"GET"
    }).then(result =>{
      // console.log(result)
      this.setData({
        doctorList:result.data.data,
        dateIndex:-1
      })
    })
  },
  //得到对应日期的医生信息
  getdoctordateList(){
    request({
      url:"http://localhost:3003/getregisterdatelist",
      data:{
        departname:this.data.departname,
        projectname:this.data.projectname,
        senddata:this.data.senddata,
        dateIndex:this.data.dateIndex
      },
      method:"GET"
    }).then(result =>{
      console.log(result)
      this.setData({
        doctorList:result.data.data
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