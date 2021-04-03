// pages/registerinformation/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arraypicker:['男','女'],
    index:0,
    departname: "",
    doctorname: "",
    projectname: "",
    registrationFee: "",
    registrationNum: "",
    residueNum: "",
    scheduleDate: "",
    week: "",
    patientname:"",
    patientsex:"男",
    patientphone:"",
    patientid:"",
    registerstatus:'预约成功',//表示预约状态
    confirmform:false,//表示表单是否更改状态
    selectbtntop:false,//表示按钮的显示与隐藏
    error:1//默认提交信息时所有内容通过验证

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
  tapNextBtn(e){
    this.setData({
      error:0
    })

    if(!this.data.patientname){
      const nowerrors=this.data.error+1;

      wx.showToast({
        title: '姓名不可为空',
        duration: 3000,
        icon:'none'
        });      
        this.setData({
          error:nowerrors
        })
        }else{
          const nowerror=this.data.error+0;
          this.setData({
            error:nowerror
          })
        }
    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(this.data.patientname))) {
      wx.showToast({
      title: '姓名输入不合法',
      duration: 3000,
      icon:'none'
      });
      const nowerrors=this.data.error+1;
        this.setData({
          error:nowerrors
        })
        }else{
          const nowerror=this.data.error+0;
          this.setData({
            error:nowerror
          })
      }
      if(!this.data.patientphone){
        wx.showToast({
          title: '手机号码为空',
          duration: 3000,
          icon:'none'
          });
          const nowerrors=this.data.error+1;
          this.setData({
            error:nowerrors
          })
          }else{
            const nowerror=this.data.error+0;
            this.setData({
              error:nowerror
            })
          }
     if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.patientphone))) {
        wx.showToast({
        title: '电话号码有误',
        duration: 3000,
        icon:'none'
        });
        const nowerrors=this.data.error+1;
        this.setData({
          error:nowerrors
        })
        }else{
          const nowerror=this.data.error+0;
          this.setData({
            error:nowerror
          })
        }
        if(!this.data.patientid){
          wx.showToast({
            title: '证件号不可为空',
            duration: 3000,
            icon:'none'
            });
            const nowerrors=this.data.error+1;
        this.setData({
          error:nowerrors
        })
        }else{
          const nowerror=this.data.error+0;
          this.setData({
            error:nowerror
          })
            }
       if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.patientid))) {
          wx.showToast({
          title: '证件号有误',
          duration: 3000,
          icon:'none'
          });
          const nowerrors=this.data.error+1;
        this.setData({
          error:nowerrors
        })
        }else{
          const nowerror=this.data.error+0;
          this.setData({
            error:nowerror
          })
          }
    if(!this.data.error)
    {
    wx.showModal({
      title: '提示',
      content: '请再次确定所填写内容的正确性',
      success :res=> {
        if (res.confirm) {
          const nowconfirm=this.data.confirmform;
          const nowbtntop=this.data.selectbtntop;
          this.setData({
            confirmform:!nowconfirm,
            selectbtntop:!nowbtntop
          });
        } else if (res.cancel) {
          this.setData({
            error:0
          })
        }
      }
    })
  }else{
    console.log('confirm error')
  }
  },
  tapNextBtnconfirm(){
    //确认时对预约信息进行保存
    this.saveregisterList();
    wx.reLaunch({
      url: '/pages/infosubmit/index',
    })
  },
  saveregisterList(){
    request({
      url:"http://localhost:3003/saveregisterinformation",
      data:{
      patientname:this.data.patientname,
      patientsex:this.data.patientsex,
      patientphone:this.data.patientphone,
      patientid:this.data.patientid,
      departname:this.data.departname,
      projectname:this.data.projectname,
      doctorname:this.data.doctorname,
      registerdate:this.data.scheduleDate,
      registerstatus:this.data.registerstatus,
      registerFee:this.data.registrationFee
      }
    }).then(result =>{
      console.log(1)
    })
  },
  tapNextBtnchange(){
    const nowconfirms=this.data.confirmform;
    const nowbtntops=this.data.selectbtntop;
    this.setData({
      confirmform:!nowconfirms,
      selectbtntop:!nowbtntops
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
    departname: options.departname,
    doctorname: options.doctorname,
    projectname: options.projectname,
    registrationFee: options.registrationFee,
    registrationNum: options.registrationNum,
    residueNum: options.residueNum,
    scheduleDate: options.scheduleDate,
    week: options.week
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