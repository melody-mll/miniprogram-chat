"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var requests = exports.requests = function requests(params) {
  return new Promise(function (resolve, reject) {
    wx.request(_extends({}, params, {
      success: function success(result) {
        resolve(result);
      },
      fail: function fail(err) {
        reject(err);
      }
    }));
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVlc3RzIiwicGFyYW1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsInJlcXVlc3QiLCJzdWNjZXNzIiwicmVzdWx0IiwiZmFpbCIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBTyxJQUFNQSw4QkFBUyxTQUFUQSxRQUFTLENBQUNDLE1BQUQsRUFBVTtBQUM5QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDbkNDLE9BQUdDLE9BQUgsY0FDS0wsTUFETDtBQUVFTSxlQUFRLGlCQUFDQyxNQUFELEVBQVU7QUFDaEJMLGdCQUFRSyxNQUFSO0FBQ0QsT0FKSDtBQUtFQyxZQUFLLGNBQUNDLEdBQUQsRUFBTztBQUNYTixlQUFPTSxHQUFQO0FBQ0E7QUFQSDtBQVNELEdBVk0sQ0FBUDtBQVdELENBWk0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcmVxdWVzdHM9KHBhcmFtcyk9PntcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgICAgc3VjY2VzczoocmVzdWx0KT0+e1xyXG4gICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbDooZXJyKT0+e1xyXG4gICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxufSJdfQ==