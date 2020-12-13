// pages/WCH/submitOrder/submitOrder.js
const app = getApp()

import {
  cancelOrder
} from '../../../service/bill'

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
    isPay: null,
    obj: {}
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('submitOrder', data => {
      console.log(data);
      
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
        obj: data.obj
      })
    })
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
    cancelOrder({
      orderNumber: this.data.orderNum
    }).then(res => {
      console.log(res);
    })
  },

  pay() {
    wx.request({
      url: 'http://192.168.43.63:8080/wechatpay/prePay',
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
  },
})