// pages/mine/personInfo/personInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    name: '',
    phoneNumber: '',
    sex: ['男', '女'],
  },
  headChange() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        app.globalData.head=tempFilePaths ;
        that.setData({
          imgUrl: tempFilePaths
        })
        console.log(tempFilePaths);

      },
      fail: function (errInfo) { console.info(errInfo) }
    })
  },
  nameChange() {
    wx.navigateTo({
      url: '/pages/mine/nameChange/nameChange',
    })
  },
  phoneChange() {
    wx.navigateTo({
      url: '/pages/mine/phoneChange/phoneChange',
    })
  },
  PickerChange(e) {
    app.globalData.sex = e.detail.value
    this.setData({
      index: e.detail.value
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
      name: app.globalData.name,
      phoneNumber: app.globalData.phoneNumber,
      index: app.globalData.sex,
      imgUrl: app.globalData.head
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