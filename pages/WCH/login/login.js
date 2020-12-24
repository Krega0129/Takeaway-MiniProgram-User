// pages/WCH/login/login.js
import {
  login
} from '../../../utils/util'

Page({
  data: {
    code: null
  },
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('code', data => {
      this.data.code = data.code
    })
  },
  showLogin(e) {
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      wx.showLoading({
        title: '正在登录中...',
        icon: 'loading',
        mask: true
      })
      login({
        code: this.data.code,
        encryptedData: encryptedData,
        iv: iv
      }).then(res => {
        const id = res.data.data.id
        const token = res.data.data.token
        if(res.data.code === 3252 || res.data.code === 3251) {
          wx.setStorageSync('token', token)
          wx.setStorageSync('userId', id)
          wx.hideLoading()
          wx.showToast({
            title: '登录成功',
            duration: 1000
          })
          setTimeout(() => {
            wx.navigateBack()
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
})