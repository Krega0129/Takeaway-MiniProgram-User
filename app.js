//app.js
import { showToast } from './service/config'
import  bus  from './utils/bus'
App({
  onLaunch: function () {
    this.globalData.bus=bus
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.setStorageSync('searchSchoolHistoryList', [])
    wx.setStorageSync('searchFoodHistoryList', [])

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow() {
    this.webSocketConnect()
  },
  globalData: {
    StatusBar: null,
    userInfo: null,
    Custom: null,
    CustomBar: null,
    nowLocation: '广东工业大学'
  },
  webSocketConnect(uid = 12, identity, lastestOrderDate) {
    wx.connectSocket({
      url: 'ws://192.168.1.111:58080/ws',
      timeout: 50000,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('connect',res);
        this.webSocketOpen(uid, identity = 'user', lastestOrderDate)
      },
      fail: (res) => {
      }
    })
  },
  webSendSocketMessage(uid, identity, lastestOrderDate) {
    if(lastestOrderDate){
      wx.sendSocketMessage({
        data: JSON.stringify({
          uid,
          identity,
          lastestOrderDate
        }),
        success: res => {
          console.log('send',res);
          this.webGetSocketMessage()
        }
      })
    }
    else{
      wx.sendSocketMessage({
        data: JSON.stringify({
          uid,
          identity,
        }),
        success: res => {
          console.log('send',res);
          this.webGetSocketMessage()
        }
      })
    }
  },
  webGetSocketMessage() {      
    wx.onSocketMessage((res) => {
    // const a=JSON.parse(res.data)
      console.log('get',res);
      if(res.data!=="服务器连接成功！"){
        // console.log(JSON.parse(res.data));
        let orderMsg=JSON.parse(res.data)
        bus.emit('orderMsg',orderMsg)
        // showToast('订单状态改变', 1000)
      }
    })
  },
  webSocketOpen(uid, identity, lastestOrderDate) {
    wx.onSocketOpen((res) => {
      this.webSendSocketMessage(uid, identity, lastestOrderDate)
    })
  },
  webSocketClose() {
    wx.onSocketClose((result) => { })
  }
})
