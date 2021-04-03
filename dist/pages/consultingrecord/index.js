'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _websocketHeartbeatMiniprogram = require('./../../npm/websocket-heartbeat-miniprogram/dist/index.js');

var _websocketHeartbeatMiniprogram2 = _interopRequireDefault(_websocketHeartbeatMiniprogram);

var _index = require('./../../requests/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { chatVersion, wsDomain } from 'config/globalConfig';
//import uploadFile from 'shared/uploadFile';


//import debounce from 'utils/debounce';
var loadLastTime = void 0;

var _default = function (_wepy$page) {
  _inherits(_default, _wepy$page);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的咨询'
    }, _this.pageNum = 0, _this.socketTask = null, _this.data = {
      isConnectSocket: false,
      isIpx: false,
      messageVal: '',
      messageList: []
    }, _this.methods = {
      inputEvent: function inputEvent(_ref2) {
        var detail = _ref2.detail;

        //this.getchatrecordList();
        var value = detail.value;

        this.messageVal = value.trim() ? value : '';
        //this.$apply();
      },

      // previewImgageEevent(url) {
      //   wepy.previewImage({
      //     current: url,
      //     urls: [url]
      //   });
      // },
      // loadmoreEvent(e) {
      //   //this.loadMoreDebounce();
      // },
      // 选中图片进行上传
      // chooseImgEvent() {
      //   wepy
      //     .chooseImage({
      //       count: 1 // 最多可以选择的图片张数
      //     })
      //     .then(result => {
      //       const { errMsg, tempFilePaths } = result;
      //       if (errMsg === 'chooseImage:ok') {
      //         wepy.showNavigationBarLoading();
      //         Promise.all(
      //           //tempFilePaths.map((url, index) => uploadFile(url, 'file'))
      //         )
      //           .then(result => {
      //             wepy.hideNavigationBarLoading();
      //             this.sendMessage(result.join(','), 2).catch(err => {
      //               if (typeof err === 'string') {
      //                 wepy.showToast({
      //                   title: err, // 提示的内容,
      //                   icon: 'none', // 图标,
      //                   duration: 1000 // 延迟时间,
      //                 });
      //               }
      //             });
      //           })
      //           .catch(err => {
      //             wepy.hideNavigationBarLoading();
      //             if (typeof err === 'string') {
      //               wepy.showToast({
      //                 title: err, // 提示的内容,
      //                 icon: 'none', // 图标,
      //                 duration: 1000 // 延迟时间,
      //               });
      //             }
      //             console.log(err);
      //           });
      //       }
      //     });
      // },
      messageSubmitEvent: function messageSubmitEvent() {
        var _this2 = this;

        if (this.messageVal !== '') {
          this.sendMessage(this.messageVal, 1).then(function (res) {
            _this2.messageVal = '';
            //this.$apply();
          }).catch(function (err) {
            _wepy2.default.showToast({
              title: err, // 提示的内容,
              icon: 'none', // 图标,
              duration: 1000 // 延迟时间,
            });
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //   loadMoreDebounce = debounce(
  //     () => {
  //       this.loadData(false);
  //     },
  //     500,
  //     true
  //   );

  _createClass(_default, [{
    key: 'showLoading',
    value: function showLoading(init) {
      if (init) {
        _wepy2.default.showNavigationBarLoading();
      }
    }
  }, {
    key: 'hideLoading',
    value: function hideLoading(init) {
      if (init) {
        _wepy2.default.hideNavigationBarLoading();
      } else {
        _wepy2.default.stopPullDownRefresh();
      }
    }

    // 下拉消息合并
    // mergeMessage(newData = []) {
    //   const messageList = this.messageList;
    //   if (messageList.length) {
    //     const oldLastDateContent = messageList[messageList.length - 1];
    //     const newFisrstDateContent = newData[0];
    //     // 如果下拉的数据第一个date与现有的数据最后一个date相同，则要把相同的这两个miniMsgs进行合并
    //     if (oldLastDateContent.date === newFisrstDateContent.date) {
    //       oldLastDateContent.miniMsgs = newFisrstDateContent.miniMsgs.concat(
    //         oldLastDateContent.miniMsgs
    //       );
    //       newData.splice(0, 1);
    //     }
    //     return messageList.concat(newData);
    //   } else {
    //     return newData;
    //   }
    // }

  }, {
    key: 'sendMessage',
    value: function sendMessage(content, contentType) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (_this3.isConnectSocket) {
          try {
            _this3.socketTask.send({
              data: JSON.stringify({
                relationId: _this3.relationId,
                sysType: 1,
                sendUserType: 1,
                content: content,
                contentType: contentType
              })
            });
            resolve();
          } catch (err) {
            reject(err);
          }
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('网络异常，请检查网络后重新进入！');
        }
      });
    }

    // 创建webSocket任务

  }, {
    key: 'createWebSocketTask',
    value: function createWebSocketTask() {
      var _this4 = this;

      // const ws = new WebSocket('ws://localhost:3003/websocketcollection');
      // ws.onopen = function () {
      //         console.log('WebSocket已连接');
      //         // 使用连接发送数据
      //         ws.send('Hello!');
      //     };

      //     // 客户端接收服务端数据时触发
      //     ws.onmessage = function (msg) {
      //         console.log('来自服务器端数据:', msg.data); // MessageEvent {isTrusted: true, data: "欢迎光临" ...}
      //         alert(msg.data);
      //         // 关闭连接
      //         // ws.close();
      //     };

      //     // 通信发生错误时触发
      //     ws.onerror = function (e) {
      //         console.log(e);
      //     };

      //     // 连接关闭时触发
      //     ws.onclose = function () {
      //         console.log('WebSocket已关闭');
      //     }
      console.log('createWebSocketTask');
      (0, _websocketHeartbeatMiniprogram2.default)({
        miniprogram: wx,
        pingMsg: 'ping',
        connectSocketParams: {
          url: 'ws://localhost:3002',
          header: {
            'content-type': 'application/json'
            //Authorization: this.$db.get('token')
          }
        }
      }).then(function (task) {
        _this4.socketTask = task;
        console.log(task, 'task');

        task.onOpen = function () {
          // 钩子函数
          console.log('open');
          _this4.isConnectSocket = true;
          _this4.$apply();
        };
        task.onClose = function () {
          // 钩子函数
          console.log('close');
          _this4.isConnectSocket = false;
          _this4.$apply();
        };
        task.onError = function (e) {
          // 钩子函数
          console.log('onError：', e);
        };
        task.onMessage = function (_ref3) {
          var data = _ref3.data;

          // 钩子函数
          console.log('onMessage', data);
          if (data !== 'pong') {
            var result = JSON.parse(data);
            var date = result.createDate.slice(0, 10);
            var findItem = _this4.messageList.find(function (item) {
              return item.date === date;
            });
            if (findItem) {
              findItem.miniMsgs.push(result);
            } else {
              _this4.messageList.unshift({
                date: date,
                miniMsgs: [result]
              });
            }
            _this4.$apply();
          }
        };
      });
    }
  }, {
    key: 'reverseData',
    value: function reverseData(data) {
      if (Array.isArray(data) && data.length) {
        data = data.reverse();
      }
      return data;
    }

    // loadData(init = false) {
    //   let lastTime = Date.now();
    //   if (!init && this.messageList.length) {
    //     const latestMessageList = this.messageList[this.messageList.length - 1]
    //       .miniMsgs;
    //     lastTime = new Date(
    //       latestMessageList[0].createDate.replace(/-/g, '/')
    //     ).getTime();
    //   }
    //   if (loadLastTime !== lastTime) {
    //     loadLastTime = lastTime;
    //     // 获取消息列表中的最后一条消息
    //     const params = {
    //       relationId: this.relationId,
    //       lastTime,
    //       isFirst: Number(init)
    //     };
    //     this.showLoading(init);
    //     this.dispatchRequest(`/${chatVersion}/treat/getChatRecord`, params, 'GET')
    //       .then(response => {
    //         this.hideLoading(init);
    //         let { data, code } = response;
    //         if (code === 10000 && data.length) {
    //           data = this.reverseData(data);
    //           this.messageList = this.mergeMessage(data);
    //           if (init) {
    //             this.createWebSocketTask();
    //           }

    //           this.$apply();
    //         }
    //       })
    //       .catch(err => {
    //         this.hideLoading(init);
    //         wepy.showToast({
    //           title: `${err.statusCode}`, // 提示的内容,
    //           icon: 'none', // 图标,
    //           duration: 1500 // 延迟时间,
    //         });
    //       });
    //   }
    // }

  }, {
    key: 'onLoad',
    value: function onLoad() {
      var relationId = this.$wxpage.options.relationId;
      //this.isIpx = this.$db.get('isIpx');

      this.relationId = relationId;
      this.getchatrecordList();
      this.createWebSocketTask();
      //this.loadData(true);
    }
  }, {
    key: 'getchatrecordList',
    value: function getchatrecordList() {
      var _this5 = this;

      (0, _index.requests)({
        url: "http://localhost:3003/getchatrecordlist"
      }).then(function (result) {
        _this5.messageList = result.data.data;
        _this5.setData({
          messageList: result.data.data
        });
      });
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      this.socketTask && this.socketTask.close();
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/consultingrecord/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRMYXN0VGltZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJwYWdlTnVtIiwic29ja2V0VGFzayIsImRhdGEiLCJpc0Nvbm5lY3RTb2NrZXQiLCJpc0lweCIsIm1lc3NhZ2VWYWwiLCJtZXNzYWdlTGlzdCIsIm1ldGhvZHMiLCJpbnB1dEV2ZW50IiwiZGV0YWlsIiwidmFsdWUiLCJ0cmltIiwibWVzc2FnZVN1Ym1pdEV2ZW50Iiwic2VuZE1lc3NhZ2UiLCJ0aGVuIiwiY2F0Y2giLCJ3ZXB5Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnIiLCJpY29uIiwiZHVyYXRpb24iLCJpbml0Iiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImNvbnRlbnQiLCJjb250ZW50VHlwZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZWxhdGlvbklkIiwic3lzVHlwZSIsInNlbmRVc2VyVHlwZSIsImNvbnNvbGUiLCJsb2ciLCJtaW5pcHJvZ3JhbSIsInd4IiwicGluZ01zZyIsImNvbm5lY3RTb2NrZXRQYXJhbXMiLCJ1cmwiLCJoZWFkZXIiLCJ0YXNrIiwib25PcGVuIiwiJGFwcGx5Iiwib25DbG9zZSIsIm9uRXJyb3IiLCJlIiwib25NZXNzYWdlIiwicmVzdWx0IiwicGFyc2UiLCJkYXRlIiwiY3JlYXRlRGF0ZSIsInNsaWNlIiwiZmluZEl0ZW0iLCJmaW5kIiwiaXRlbSIsIm1pbmlNc2dzIiwicHVzaCIsInVuc2hpZnQiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJyZXZlcnNlIiwiJHd4cGFnZSIsIm9wdGlvbnMiLCJnZXRjaGF0cmVjb3JkTGlzdCIsImNyZWF0ZVdlYlNvY2tldFRhc2siLCJzZXREYXRhIiwiY2xvc2UiLCJwYWdlIl0sIm1hcHBpbmdz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QSxJQUEvQjtBQUNBLGVBQUtxRSxPQUFMLENBQWE7QUFDWGpFLHVCQUFZOEMsT0FBT2xELElBQVAsQ0FBWUE7QUFEYixTQUFiO0FBR0QsT0FQRDtBQVFEOzs7K0JBRVU7QUFDVCxXQUFLRCxVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0J1RSxLQUFoQixFQUFuQjtBQUNEOzs7O0VBOVMwQnhELGVBQUt5RCxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4vL2ltcG9ydCB7IGNoYXRWZXJzaW9uLCB3c0RvbWFpbiB9IGZyb20gJ2NvbmZpZy9nbG9iYWxDb25maWcnO1xyXG4vL2ltcG9ydCB1cGxvYWRGaWxlIGZyb20gJ3NoYXJlZC91cGxvYWRGaWxlJztcclxuaW1wb3J0IFdlYnNvY2tldEhlYXJ0YmVhdCBmcm9tICd3ZWJzb2NrZXQtaGVhcnRiZWF0LW1pbmlwcm9ncmFtJztcclxuaW1wb3J0IHtyZXF1ZXN0c30gZnJvbSAnQC9yZXF1ZXN0cy9pbmRleCc7XHJcbi8vaW1wb3J0IGRlYm91bmNlIGZyb20gJ3V0aWxzL2RlYm91bmNlJztcclxubGV0IGxvYWRMYXN0VGltZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTlkqjor6InXHJcbiAgfTtcclxuXHJcbi8vICAgbG9hZE1vcmVEZWJvdW5jZSA9IGRlYm91bmNlKFxyXG4vLyAgICAgKCkgPT4ge1xyXG4vLyAgICAgICB0aGlzLmxvYWREYXRhKGZhbHNlKTtcclxuLy8gICAgIH0sXHJcbi8vICAgICA1MDAsXHJcbi8vICAgICB0cnVlXHJcbi8vICAgKTtcclxuXHJcbiAgcGFnZU51bSA9IDA7XHJcbiAgc29ja2V0VGFzayA9IG51bGw7XHJcbiAgZGF0YSA9IHtcclxuICAgIGlzQ29ubmVjdFNvY2tldDogZmFsc2UsXHJcbiAgICBpc0lweDogZmFsc2UsXHJcbiAgICBtZXNzYWdlVmFsOiAnJyxcclxuICAgIG1lc3NhZ2VMaXN0OiBbXVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBpbnB1dEV2ZW50KHsgZGV0YWlsIH0pIHtcclxuICAgICAgLy90aGlzLmdldGNoYXRyZWNvcmRMaXN0KCk7XHJcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGRldGFpbDtcclxuICAgICAgdGhpcy5tZXNzYWdlVmFsID0gdmFsdWUudHJpbSgpID8gdmFsdWUgOiAnJztcclxuICAgICAgLy90aGlzLiRhcHBseSgpO1xyXG4gICAgfSxcclxuICAgIC8vIHByZXZpZXdJbWdhZ2VFZXZlbnQodXJsKSB7XHJcbiAgICAvLyAgIHdlcHkucHJldmlld0ltYWdlKHtcclxuICAgIC8vICAgICBjdXJyZW50OiB1cmwsXHJcbiAgICAvLyAgICAgdXJsczogW3VybF1cclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyB9LFxyXG4gICAgLy8gbG9hZG1vcmVFdmVudChlKSB7XHJcbiAgICAvLyAgIC8vdGhpcy5sb2FkTW9yZURlYm91bmNlKCk7XHJcbiAgICAvLyB9LFxyXG4gICAgLy8g6YCJ5Lit5Zu+54mH6L+b6KGM5LiK5LygXHJcbiAgICAvLyBjaG9vc2VJbWdFdmVudCgpIHtcclxuICAgIC8vICAgd2VweVxyXG4gICAgLy8gICAgIC5jaG9vc2VJbWFnZSh7XHJcbiAgICAvLyAgICAgICBjb3VudDogMSAvLyDmnIDlpJrlj6/ku6XpgInmi6nnmoTlm77niYflvKDmlbBcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAvLyAgICAgICBjb25zdCB7IGVyck1zZywgdGVtcEZpbGVQYXRocyB9ID0gcmVzdWx0O1xyXG4gICAgLy8gICAgICAgaWYgKGVyck1zZyA9PT0gJ2Nob29zZUltYWdlOm9rJykge1xyXG4gICAgLy8gICAgICAgICB3ZXB5LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xyXG4gICAgLy8gICAgICAgICBQcm9taXNlLmFsbChcclxuICAgIC8vICAgICAgICAgICAvL3RlbXBGaWxlUGF0aHMubWFwKCh1cmwsIGluZGV4KSA9PiB1cGxvYWRGaWxlKHVybCwgJ2ZpbGUnKSlcclxuICAgIC8vICAgICAgICAgKVxyXG4gICAgLy8gICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShyZXN1bHQuam9pbignLCcpLCAyKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICB0aXRsZTogZXJyLCAvLyDmj5DnpLrnmoTlhoXlrrksXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsIC8vIOWbvuaghyxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwIC8vIOW7tui/n+aXtumXtCxcclxuICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRpdGxlOiBlcnIsIC8vIOaPkOekuueahOWGheWuuSxcclxuICAgIC8vICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsIC8vIOWbvuaghyxcclxuICAgIC8vICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCAvLyDlu7bov5/ml7bpl7QsXHJcbiAgICAvLyAgICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sXHJcbiAgICBtZXNzYWdlU3VibWl0RXZlbnQoKSB7XHJcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VWYWwgIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSh0aGlzLm1lc3NhZ2VWYWwsIDEpXHJcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VWYWwgPSAnJztcclxuICAgICAgICAgICAgLy90aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IGVyciwgLy8g5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJywgLy8g5Zu+5qCHLFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwIC8vIOW7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNob3dMb2FkaW5nKGluaXQpIHtcclxuICAgIGlmIChpbml0KSB7XHJcbiAgICAgIHdlcHkuc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZyhpbml0KSB7XHJcbiAgICBpZiAoaW5pdCkge1xyXG4gICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDkuIvmi4nmtojmga/lkIjlubZcclxuICAvLyBtZXJnZU1lc3NhZ2UobmV3RGF0YSA9IFtdKSB7XHJcbiAgLy8gICBjb25zdCBtZXNzYWdlTGlzdCA9IHRoaXMubWVzc2FnZUxpc3Q7XHJcbiAgLy8gICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoKSB7XHJcbiAgLy8gICAgIGNvbnN0IG9sZExhc3REYXRlQ29udGVudCA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VMaXN0Lmxlbmd0aCAtIDFdO1xyXG4gIC8vICAgICBjb25zdCBuZXdGaXNyc3REYXRlQ29udGVudCA9IG5ld0RhdGFbMF07XHJcbiAgLy8gICAgIC8vIOWmguaenOS4i+aLieeahOaVsOaNruesrOS4gOS4qmRhdGXkuI7njrDmnInnmoTmlbDmja7mnIDlkI7kuIDkuKpkYXRl55u45ZCM77yM5YiZ6KaB5oqK55u45ZCM55qE6L+Z5Lik5LiqbWluaU1zZ3Pov5vooYzlkIjlubZcclxuICAvLyAgICAgaWYgKG9sZExhc3REYXRlQ29udGVudC5kYXRlID09PSBuZXdGaXNyc3REYXRlQ29udGVudC5kYXRlKSB7XHJcbiAgLy8gICAgICAgb2xkTGFzdERhdGVDb250ZW50Lm1pbmlNc2dzID0gbmV3RmlzcnN0RGF0ZUNvbnRlbnQubWluaU1zZ3MuY29uY2F0KFxyXG4gIC8vICAgICAgICAgb2xkTGFzdERhdGVDb250ZW50Lm1pbmlNc2dzXHJcbiAgLy8gICAgICAgKTtcclxuICAvLyAgICAgICBuZXdEYXRhLnNwbGljZSgwLCAxKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgICByZXR1cm4gbWVzc2FnZUxpc3QuY29uY2F0KG5ld0RhdGEpO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgcmV0dXJuIG5ld0RhdGE7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICBzZW5kTWVzc2FnZShjb250ZW50LCBjb250ZW50VHlwZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaXNDb25uZWN0U29ja2V0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuc29ja2V0VGFzay5zZW5kKHtcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgIHJlbGF0aW9uSWQ6IHRoaXMucmVsYXRpb25JZCxcclxuICAgICAgICAgICAgICBzeXNUeXBlOiAxLFxyXG4gICAgICAgICAgICAgIHNlbmRVc2VyVHlwZTogMSxcclxuICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXByb21pc2UtcmVqZWN0LWVycm9yc1xyXG4gICAgICAgIHJlamVjdCgn572R57uc5byC5bi477yM6K+35qOA5p+l572R57uc5ZCO6YeN5paw6L+b5YWl77yBJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8g5Yib5bu6d2ViU29ja2V05Lu75YqhXHJcbiAgY3JlYXRlV2ViU29ja2V0VGFzaygpIHtcclxuICAgIC8vIGNvbnN0IHdzID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMy93ZWJzb2NrZXRjb2xsZWN0aW9uJyk7XHJcbiAgICAvLyB3cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdXZWJTb2NrZXTlt7Lov57mjqUnKTtcclxuICAgIC8vICAgICAgICAgLy8g5L2/55So6L+e5o6l5Y+R6YCB5pWw5o2uXHJcbiAgICAvLyAgICAgICAgIHdzLnNlbmQoJ0hlbGxvIScpO1xyXG4gICAgLy8gICAgIH07XHJcblxyXG4gICAgLy8gICAgIC8vIOWuouaIt+err+aOpeaUtuacjeWKoeerr+aVsOaNruaXtuinpuWPkVxyXG4gICAgLy8gICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ+adpeiHquacjeWKoeWZqOerr+aVsOaNrjonLCBtc2cuZGF0YSk7IC8vIE1lc3NhZ2VFdmVudCB7aXNUcnVzdGVkOiB0cnVlLCBkYXRhOiBcIuasoui/juWFieS4tFwiIC4uLn1cclxuICAgIC8vICAgICAgICAgYWxlcnQobXNnLmRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvLyDlhbPpl63ov57mjqVcclxuICAgIC8vICAgICAgICAgLy8gd3MuY2xvc2UoKTtcclxuICAgIC8vICAgICB9O1xyXG5cclxuICAgIC8vICAgICAvLyDpgJrkv6Hlj5HnlJ/plJnor6/ml7bop6blj5FcclxuICAgIC8vICAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAvLyAgICAgfTtcclxuXHJcbiAgICAvLyAgICAgLy8g6L+e5o6l5YWz6Zet5pe26Kem5Y+RXHJcbiAgICAvLyAgICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldOW3suWFs+mXrScpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVXZWJTb2NrZXRUYXNrJyk7XHJcbiAgICBXZWJzb2NrZXRIZWFydGJlYXQoe1xyXG4gICAgICBtaW5pcHJvZ3JhbTogd3gsXHJcbiAgICAgIHBpbmdNc2c6ICdwaW5nJyxcclxuICAgICAgY29ubmVjdFNvY2tldFBhcmFtczoge1xyXG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMy93ZWJzb2NrZXRjb2xsZWN0aW9uJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAvL0F1dGhvcml6YXRpb246IHRoaXMuJGRiLmdldCgndG9rZW4nKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSkudGhlbih0YXNrID0+IHtcclxuICAgICAgdGhpcy5zb2NrZXRUYXNrID0gdGFzaztcclxuICAgICAgY29uc29sZS5sb2codGFzaywgJ3Rhc2snKTtcclxuXHJcbiAgICAgIHRhc2sub25PcGVuID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIOmSqeWtkOWHveaVsFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICAgICAgdGhpcy5pc0Nvbm5lY3RTb2NrZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRhc2sub25DbG9zZSA9ICgpID0+IHtcclxuICAgICAgICAvLyDpkqnlrZDlh73mlbBcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UnKTtcclxuICAgICAgICB0aGlzLmlzQ29ubmVjdFNvY2tldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRhc2sub25FcnJvciA9IGUgPT4ge1xyXG4gICAgICAgIC8vIOmSqeWtkOWHveaVsFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkVycm9y77yaJywgZSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRhc2sub25NZXNzYWdlID0gKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgLy8g6ZKp5a2Q5Ye95pWwXHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTWVzc2FnZScsIGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhICE9PSAncG9uZycpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICBjb25zdCBkYXRlID0gcmVzdWx0LmNyZWF0ZURhdGUuc2xpY2UoMCwgMTApO1xyXG4gICAgICAgICAgY29uc3QgZmluZEl0ZW0gPSB0aGlzLm1lc3NhZ2VMaXN0LmZpbmQoaXRlbSA9PiBpdGVtLmRhdGUgPT09IGRhdGUpO1xyXG4gICAgICAgICAgaWYgKGZpbmRJdGVtKSB7XHJcbiAgICAgICAgICAgIGZpbmRJdGVtLm1pbmlNc2dzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICBtaW5pTXNnczogW3Jlc3VsdF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV2ZXJzZURhdGEoZGF0YSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGgpIHtcclxuICAgICAgZGF0YSA9IGRhdGEucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICAvLyBsb2FkRGF0YShpbml0ID0gZmFsc2UpIHtcclxuICAvLyAgIGxldCBsYXN0VGltZSA9IERhdGUubm93KCk7XHJcbiAgLy8gICBpZiAoIWluaXQgJiYgdGhpcy5tZXNzYWdlTGlzdC5sZW5ndGgpIHtcclxuICAvLyAgICAgY29uc3QgbGF0ZXN0TWVzc2FnZUxpc3QgPSB0aGlzLm1lc3NhZ2VMaXN0W3RoaXMubWVzc2FnZUxpc3QubGVuZ3RoIC0gMV1cclxuICAvLyAgICAgICAubWluaU1zZ3M7XHJcbiAgLy8gICAgIGxhc3RUaW1lID0gbmV3IERhdGUoXHJcbiAgLy8gICAgICAgbGF0ZXN0TWVzc2FnZUxpc3RbMF0uY3JlYXRlRGF0ZS5yZXBsYWNlKC8tL2csICcvJylcclxuICAvLyAgICAgKS5nZXRUaW1lKCk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBpZiAobG9hZExhc3RUaW1lICE9PSBsYXN0VGltZSkge1xyXG4gIC8vICAgICBsb2FkTGFzdFRpbWUgPSBsYXN0VGltZTtcclxuICAvLyAgICAgLy8g6I635Y+W5raI5oGv5YiX6KGo5Lit55qE5pyA5ZCO5LiA5p2h5raI5oGvXHJcbiAgLy8gICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAvLyAgICAgICByZWxhdGlvbklkOiB0aGlzLnJlbGF0aW9uSWQsXHJcbiAgLy8gICAgICAgbGFzdFRpbWUsXHJcbiAgLy8gICAgICAgaXNGaXJzdDogTnVtYmVyKGluaXQpXHJcbiAgLy8gICAgIH07XHJcbiAgLy8gICAgIHRoaXMuc2hvd0xvYWRpbmcoaW5pdCk7XHJcbiAgLy8gICAgIHRoaXMuZGlzcGF0Y2hSZXF1ZXN0KGAvJHtjaGF0VmVyc2lvbn0vdHJlYXQvZ2V0Q2hhdFJlY29yZGAsIHBhcmFtcywgJ0dFVCcpXHJcbiAgLy8gICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gIC8vICAgICAgICAgdGhpcy5oaWRlTG9hZGluZyhpbml0KTtcclxuICAvLyAgICAgICAgIGxldCB7IGRhdGEsIGNvZGUgfSA9IHJlc3BvbnNlO1xyXG4gIC8vICAgICAgICAgaWYgKGNvZGUgPT09IDEwMDAwICYmIGRhdGEubGVuZ3RoKSB7XHJcbiAgLy8gICAgICAgICAgIGRhdGEgPSB0aGlzLnJldmVyc2VEYXRhKGRhdGEpO1xyXG4gIC8vICAgICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gdGhpcy5tZXJnZU1lc3NhZ2UoZGF0YSk7XHJcbiAgLy8gICAgICAgICAgIGlmIChpbml0KSB7XHJcbiAgLy8gICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWJTb2NrZXRUYXNrKCk7XHJcbiAgLy8gICAgICAgICAgIH1cclxuXHJcbiAgLy8gICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgfSlcclxuICAvLyAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAvLyAgICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoaW5pdCk7XHJcbiAgLy8gICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgLy8gICAgICAgICAgIHRpdGxlOiBgJHtlcnIuc3RhdHVzQ29kZX1gLCAvLyDmj5DnpLrnmoTlhoXlrrksXHJcbiAgLy8gICAgICAgICAgIGljb246ICdub25lJywgLy8g5Zu+5qCHLFxyXG4gIC8vICAgICAgICAgICBkdXJhdGlvbjogMTUwMCAvLyDlu7bov5/ml7bpl7QsXHJcbiAgLy8gICAgICAgICB9KTtcclxuICAvLyAgICAgICB9KTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IHsgcmVsYXRpb25JZCB9ID0gdGhpcy4kd3hwYWdlLm9wdGlvbnM7XHJcbiAgICAvL3RoaXMuaXNJcHggPSB0aGlzLiRkYi5nZXQoJ2lzSXB4Jyk7XHJcbiAgICB0aGlzLnJlbGF0aW9uSWQgPSByZWxhdGlvbklkO1xyXG4gICAgdGhpcy5nZXRjaGF0cmVjb3JkTGlzdCgpO1xyXG4gICAgdGhpcy5jcmVhdGVXZWJTb2NrZXRUYXNrKCk7XHJcbiAgICAvL3RoaXMubG9hZERhdGEodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRjaGF0cmVjb3JkTGlzdCgpe1xyXG4gICAgcmVxdWVzdHMoe1xyXG4gICAgICB1cmw6XCJodHRwOi8vbG9jYWxob3N0OjMwMDMvZ2V0Y2hhdHJlY29yZGxpc3RcIlxyXG4gICAgfSkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSByZXN1bHQuZGF0YS5kYXRhXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWVzc2FnZUxpc3Q6cmVzdWx0LmRhdGEuZGF0YVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9uVW5sb2FkKCkge1xyXG4gICAgdGhpcy5zb2NrZXRUYXNrICYmIHRoaXMuc29ja2V0VGFzay5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=