// pages/WCH/submitOrder/submitOrder.js
const app = getApp()

import {
  H_config
} from '../../../service/config'

import {
  cancelOrder
} from '../../../service/bill'

import {
  formatTime,
  showToast,
  pay
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
      if(!data.isPay) {
        let t = setInterval(() => {
          let time = wx.getStorageSync('time') - new Date().getTime()
          time -= 1000
          if(time <= 0) {
            this.setData({
              cancel: true
            })
            clearInterval(t)
          }
          time = formatTime(time).split(' ')[1].substring(3, 8)
          this.setData({
            time: time
          })
        }, 1000)
      }
      wx.hideLoading()
    })
  },
  callShop() {
    wx.showActionSheet({
      itemList: [this.data.storeTelNum],
      success: (res) => {
        if(res.tapIndex === 0) {
          wx.setClipboardData({
            data: this.data.storeTelNum,
            success() {
              wx.showToast({
                title: '复制成功',
              });
            },
            fail: () => {
              showToast('复制失败')
            }
          })
        }
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
            if(res && res.data && res.data.code === H_config.STATECODE_cancelUnpaidOrder_SUCCESS) {
              wx.showToast({
                title: '订单取消成功！'
              })
              this.setData({
                cancel: true
              })
            } else {
              showToast('服务器错误，请再次尝试！')
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
  toPay() {
    pay.call(this, this.data.obj)
  },
  toHome() {
    wx.reLaunch({
      url: '/pages/WCH/home/home',
    })
  }
})