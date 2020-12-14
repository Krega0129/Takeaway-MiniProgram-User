// pages/mine/nameChange/nameChange.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    name: ''
  },
  // 监听字数
  inputListener(e) {
    let value = e.detail.value;
    if (value.length === 0 || value === null) {
      this.setData({
        isEmpty: true
      })
    }
    else {
      this.setData({
        isEmpty: false,
        name:value
      })
    }
  },
  // 清空输入框
  clearInput() {
    this.setData({
      name: '',
      isEmpty: true
    })
  },
  nameModify() {
    let reg = /^[\w\u4e00-\u9fa5]{2,8}$/;
    if(!reg.test(this.data.name)){
      wx.showToast({
        icon:'none',
        title: '姓名格式不正确',
      });
    }
    else{
      wx.showToast({
        title: '修改成功',
      });
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        });  
      }, 1000);  
    app.globalData.name=this.data.name;
    
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.globalData.name,
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