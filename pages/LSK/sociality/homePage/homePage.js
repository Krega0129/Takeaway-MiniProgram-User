// pages/sociality/sociality.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png'
    }, {
      id: 1,
        type: 'image',
        url: 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg'
    }],
    imgUrl: '',
    showImg: false,
    // 点赞数量
    likeNum:0,
    // 是否点赞
    isLike:false,
    //文字内容
    contain:'我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人我是人',
    containBreak:''
  },
  tapBanner(e) {
    this.setData({
      showImg: true,
      imgUrl: e.currentTarget.dataset.url
    })
  },
  hideImg() {
    this.setData({
      showImg: false
    })
  },
  // 点赞事件触发
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
  // 判断文字是否超出字符个数限制
  wordsJudge:function(contain,num){
      if(contain.length>num){
        return contain.slice(0,num-3)+"......"
      }
      else{
        return contain
      }
  },
  // 进入详情页
  toDynamicDetails:function(){
      wx.navigateTo({
        url: '../dynamicDetails/dynamicDetails',
      })
  },
  // 进入发布动态页
  toReleaseDynamic:function(){
    wx.navigateTo({
      url: '../releaseDynamic/releaseDynamic',
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

    this.setData({
      containBreak:this.wordsJudge(this.data.contain,90)
    })
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