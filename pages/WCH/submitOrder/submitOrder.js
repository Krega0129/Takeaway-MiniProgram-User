// pages/WCH/submitOrder/submitOrder.js
const app = getApp()

import {
  BASE_URL
} from '../../../service/config'

import {
  cancelOrder
} from '../../../service/bill'

import {
  formatTime
} from '../../../utils/util'

Page({
  data: {
    cartList: [],
    totalPrice: null,
    shopName: '',
    sendPrice: 0,
    totalCount: 0,
    user: {},
    storeTelNum: null,
    remark: '',
    takeAway: true,
    orderNum: null,
    payTime: '',
    isPay: null,
    obj: {},
    time: '',
    cancel: false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })

    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('submitOrder', data => {
      let payTime = null
      if(data.payTime) {
        payTime = formatTime(data.payTime)
      }
      app.culPrice(data.cartList, data.sendPrice)
      this.setData({
        cartList: data.cartList,
        shopName: data.obj.shopName,
        sendPrice: data.obj.deliveryFee,
        shopAddress: data.shopAddress,
        totalPrice: data.obj.totalAmount,
        user: data.user,
        storeTelNum: data.storeTelNum,
        remark: data.remark,
        orderNum: data.obj.orderNumber,
        takeAway: data.takeAway,
        isPay: data.isPay,
        payTime: payTime,
        obj: data.obj
      })
    })

    let t = setInterval(() => {
      let time = wx.getStorageSync('time') - new Date().getTime()
      time -= 1000
      time = formatTime(time).split(' ')[1].substring(3, 8)
      this.setData({
        time: time
      })
      if(time <= 0) {
        clearInterval(t)
      }
    }, 1000)
  },
  onReady: function () {
    wx.hideLoading()
  },
  onShow: function () {

  },
  callShop() {
    wx.showActionSheet({
      itemList: [this.data.storeTelNum],
      success: res => {
        console.log(res);
      },
      fail: msg => {
        console.log(msg);
      }
    })
  },
  cancelOrder() {
    wx.showModal({
      content: '确定取消该订单？',
      showCancel: true,
      title: '提示',
      success: res => {
        
        if(res.confirm) {
          cancelOrder({
            orderNumber: this.data.orderNum
          }).then(res => {
            if(res.data.code === 3204) {
              wx.showToast({
                title: '订单取消成功！'
              })
              this.setData({
                cancel: true
              })
            } else {
              wx.showToast({
                title: '服务器错误，请再次尝试！',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  orderAgain() {
    wx.navigateBack({
      delta: 2
    })
  },
  pay() {
    wx.request({
      url: BASE_URL + '/wechatpay/prePay',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: this.data.obj,
      success: (res) => {
        if (res.data.prepayId != ''){
          const map = res.data.data.payMap
          wx.requestPayment({
            'appId': map.appId,
            'timeStamp': map.timeStamp,
            'nonceStr': map.nonceStr,
            'package': map.package,
            'signType': 'MD5',
            'paySign': map.paySign,
            'success': () => {
              if (res.data.prepayId != ''){
                const map = res.data.data.payMap
                wx.requestPayment({
                  'appId': map.appId,
                  'timeStamp': map.timeStamp,
                  'nonceStr': map.nonceStr,
                  'package': map.package,
                  'signType': 'MD5',
                  'paySign': map.paySign,
                  'success':  (paymentRes) => {
                    wx.redirectTo({
                      url: '/pages/WCH/submitOrder/submitOrder',
                      success: result => {
                        result.eventChannel.emit('submitOrder', {
                          cartList: this.data.cartList,
                          shopAddress: this.data.storeAddress,
                          user: this.data.user,
                          storeTelNum: this.data.storeTelNum,
                          remark: this.data.remark || '',
                          takeAway: this.data.takeAway,
                          obj: data,
                          isPay: true
                        })
                      }
                    })
                  },
                  fail: (error) => {
                    
                  }
                })
              }
            },
            'fail': function (error) {
              console.log(error)
            }
          })
        }
      }
    });
  }
})