// pages/LSK/sociality/dynamicDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点赞数量
    likeNum:0,
    // 是否点赞
    isLike:false,
    //文字内容
    contain:'我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人',
    containBreak:'',
    replyTo:'帅比林澍锴',
    commentName:'阿巴阿巴',
    placeholder:'请留下你的评论吧！'
  },
  // 点赞
  likeClick:function(){
    if(!this.data.isLike){
      this.setData({
        isLike:true,
        likeNum:this.data.likeNum+1
      })
    }
    else{
      this.setData({
        isLike:false,
        likeNum:this.data.likeNum-1
      })
    }
  },
  //回复评论
  sayTo:function(e){
    const replyTo=e.currentTarget.dataset.name
    this.setData({
      placeholder:'回复 '+replyTo+':'
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