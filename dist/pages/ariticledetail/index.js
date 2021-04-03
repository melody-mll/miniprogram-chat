// pages/ariticledetail/index.js
import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    articledetail:{},
    articlecontent:[],
    articletext:[],//表示文章详情的文本形式
    articleimage:[],//表示文章详情的图片形式
    articleid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const articleid=options.articleid;
    this.setData({
      articleid:articleid
    })
    this.getarticleList();
  },
  getarticleList(){
    request({
      url:"http://localhost:3003/getarticlelist"
    }).then(result =>{
      this.setData({
        articleList:result.data.data
      })
      const articleList=this.data.articleList;
      for(var i=0;i<articleList.length;i++){
        if(this.data.articleid==articleList[i].articleId){
          this.setData({
            articledetail:articleList[i]
          })
        }
      }
      const articlecontent=this.data.articledetail.content;
      this.setData({
        articlecontent:articlecontent
      })
      const nowcontent=this.data.articlecontent;
      const articleimage=[];
      const articletext=[];
      for(var j=0;j<nowcontent.length;j++){
        if(/(jpg|png)/g.test(nowcontent[j])){
          console.log(nowcontent[j]);
          // articleimage.push(nowcontent[j])
          articleimage[j]=nowcontent[j]
          console.log(articleimage)
          this.setData({
            articleimage:articleimage
          })
          console.log(this.data.articleimage);
        }else{
          articletext[j]=nowcontent[j];
          this.setData({
            articletext:articletext
          })
          console.log(this.data.articletext)
        }
      }
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