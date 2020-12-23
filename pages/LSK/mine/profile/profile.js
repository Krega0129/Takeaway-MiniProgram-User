// pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profileItems: [
      { icon: '', itemName: '收获地址' },
      { icon: '', itemName: '历史说说' },
      { icon: '', itemName: '商业合作' },
      { icon: '', itemName: '骑手招聘' },
      { icon: '', itemName: '投诉建议' }
    ],
    isLogin:false
  },
  toPersonInfo() {
    if(this.data.isLogin){
      wx.navigateTo({
      url: '/pages/LSK/mine/personInfo/personInfo',
    })
    }
    else{
      wx.login({
        success: res => {
          const code = res.code
          wx.navigateTo({
            url: '/pages/WCH/login/login',
            success: res => {
              res.eventChannel.emit('code',{ code: code })
            }
          })
        }
      })
    }
  },
  toAddressList() {
    wx.navigateTo({
      url: '/pages/LSK/mine/addressList/addressList',
    })
  },
  toSuggest() {
    wx.navigateTo({
      url: '/pages/LSK/mine/suggest/suggest',
    })
  },
  toSocial() {
    wx.showToast({
      icon: 'none',
      title: '内容未开放',
    });

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
  if (!wx.getStorageSync('token')) {
    this.setData({
      isLogin: false
    })
  } else {
    this.setData({
      isLogin: true
    })
  }
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