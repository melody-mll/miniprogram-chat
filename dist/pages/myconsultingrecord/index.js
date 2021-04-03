// pages/myconsultingrecord/index.js
import {request} from "../../request/index";
//import WebsocketHeartbeat from 'websocket-heartbeat-miniprogram';
Page({

  /**
   * 页面的初始数据
   */
  socketTask : null,
  data: {
    messageList:[],//表示咨询的内容信息
    messageVal:'',//表示咨询框中的内容
    isConnectSocket: false,//默认与websocket没有连接

  },
  inputEvent(e){
    const messageVal = e.detail.value;
    //console.log(e)
    this.setData({
      messageVal:messageVal
    })
  },
  //点击发送的事件，将数据通过websocket实时通讯
  // messageSubmitEvent(){
  //   if (this.messageVal !== '') {
  //     this.sendMessage(this.data.messageVal, 1)
  //       .then(res => {
  //         this.setData({
  //           messageVal:''//点击发送时，重置输入框为空
  //         })
  //         // this.$apply();
  //       })
  //       .catch(err => {
  //         wx.showToast({
  //           title: err, // 提示的内容,
  //           icon: 'none', // 图标,
  //           duration: 1000 // 延迟时间,
  //         });
  //       });
  //   }
  // },
  // sendMessage(content, contentType) {
  //   return new Promise((resolve, reject) => {
  //     if (this.data.isConnectSocket) {
  //       try {
  //         this.socketTask.send({
  //           data: JSON.stringify({
  //             relationId: this.relationId,//表示该关系的连接id
  //             sysType: 1,
  //             sendUserType: 1,
  //             content,
  //             contentType
  //           })
  //         });
  //         resolve();
  //       } catch (err) {
  //         reject(err);
  //       }
  //     } else {
  //       // eslint-disable-next-line prefer-promise-reject-errors
  //       reject('网络异常，请检查网络后重新进入！');
  //     }
  //   });
  // },

  //   // 创建webSocket任务
  //   createWebSocketTask() {
  //     console.log('createWebSocketTask');
  //     WebsocketHeartbeat({
  //       miniprogram: wx,
  //       pingMsg: 'ping',
  //       connectSocketParams: {
  //         url: `http://localhost:3003/savebindinginformation`,
  //         header: {
  //           'content-type': 'application/json',
  //           // Authorization: this.$db.get('token')
  //         }
  //       }
  //     }).then(task => {
  //       this.socketTask = task;
  //       console.log(task, 'task');
  
  //       task.onOpen = () => {
  //         // 钩子函数
  //         console.log('open');
  //         this.isConnectSocket = true;
  //         this.$apply();
  //       };
  //       task.onClose = () => {
  //         // 钩子函数
  //         console.log('close');
  //         this.isConnectSocket = false;
  //         this.$apply();
  //       };
  //       task.onError = e => {
  //         // 钩子函数
  //         console.log('onError：', e);
  //       };
  //       task.onMessage = ({ data }) => {
  //         // 钩子函数
  //         console.log('onMessage', data);
  //         if (data !== 'pong') {
  //           const result = JSON.parse(data);
  //           const date = result.createDate.slice(0, 10);
  //           const findItem = this.messageList.find(item => item.date === date);
  //           if (findItem) {
  //             findItem.miniMsgs.push(result);
  //           } else {
  //             this.messageList.unshift({
  //               date,
  //               miniMsgs: [result]
  //             });
  //           }
  //           this.$apply();
  //         }
  //       };
  //     });
  //   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getchatrecordList(),
    this.createWebSocketTask()//创建websocket连接
  },
  getchatrecordList(){
    request({
      url:"http://localhost:3003/getchatrecordlist"
    }).then(result =>{
      // console.log(result)
      this.setData({
        messageList:result.data.data
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