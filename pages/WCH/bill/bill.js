// pages/WCH/bill/bill.js
import {
  BASE_URL
} from '../../../service/config'

import {
  getAllAddress,
  orderNewOrder,
  changeOrderStatus
} from '../../../service/bill'

import {
  formatTime
} from '../../../utils/util'

const app = getApp()
Page({
  data: {
    shopId: null,
    shopName: null,
    imgUrl: null,
    cartList: [],
    totalPrice: 0,
    sendPrice: 0,
    chooseLocation: false,
    changeLocation: false,
    // locationList: [
    //   {
    //     id: 0,
    //     name: '张三',
    //     sex: '先生',
    //     telNum: '18319328003',
    //     school: '广东工业大学生活西区',
    //     room: '西三433宿舍'
    //   },
    //   {
    //     id: 1,
    //     name: '李四',
    //     sex: '先生',
    //     telNum: '19120333220',
    //     school: '广东工业大学生活西区',
    //     room: '西三433宿舍'
    //   },
    //   {
    //     id: 2,
    //     name: '努尔买买提·哈吉',
    //     sex: '先生',
    //     telNum: '17324741847',
    //     school: '广东工业大学生活西区',
    //     room: '西三433宿舍'
    //   }
    // ],
    // 当前地址
    locationList: [],
    user: {},
    takeAway: true,
    // 商家信息
    storeAddress: '',
    storeTelNum: '',
    imgUrl: '',
    // 自提预留手机号
    userTel: null,
    // 配送时间
    index: 0,
    // 显示的时间
    picker: ['立即'],
    // 真实的时间
    realTime: [],
    // 餐具
    ind: null,
    tableWare: ['不要餐具', '1份', '2份', '3份'],
    // 用来记录备注信息，以备二次编辑
    remarkObj: null,
    remark: '',
  },
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('emitStoreAddress', data => {
      app.culPrice(data.cartList, this.data.sendPrice)
      this.setData({
        shopId: data.shopId,
        shopName: data.shopName,
        storeAddress: data.storeAddress,
        storeTelNum: data.storeTelNum,
        imgUrl: data.imgUrl,
        cartList: data.cartList,
        totalPrice: app.globalData.totalPrice,
        totalCount: app.globalData.totalCount
      })
    })

    let currentTime = new Date()
    for(let i = 1; i < 8; i++) {
      let date = formatTime(currentTime)
      this.data.realTime.push(date)
      let time = date.split(' ')[1].substring(0, 5)
      if(i !== 1) {
        this.data.picker.push(time)
      }
      currentTime = currentTime.getTime() + 900000
      currentTime = new Date(currentTime)
    }

    this.setData({
      picker: this.data.picker
    })
  },
  onReady: function () {

  },
  onShow: function () {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('finishRemark', (data) => {
      this.setData({
        remark: data.remark
      })
    })

    if(wx.getStorageSync('userId')) {
      getAllAddress({
        userId: 1
      }).then(res => {
        let addressList = res.data.data
        this.setData({
          locationList: addressList
        })
      })
    }
  },
  onShareAppMessage: function () {

  },
  takeAway() {
    this.data.sendPrice = 2
    app.culPrice(this.data.cartList, this.data.sendPrice)
    this.setData({
      takeAway: true,
      sendPrice: this.data.sendPrice,
      totalPrice: app.globalData.totalPrice
    })
  },
  selfTake() {
    this.data.sendPrice = 0
    app.culPrice(this.data.cartList, this.data.sendPrice)
    this.setData({
      takeAway: false,
      sendPrice: this.data.sendPrice,
      totalPrice: app.globalData.totalPrice
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  tableWareChange(e) {
    this.setData({
      ind: e.detail.value
    })
  },
  editRemark() {
    wx.navigateTo({
      url: '/pages/WCH/remarks/remarks',
      success: res => {
        if(this.data.remarkObj) {
          res.eventChannel.emit('editRemark', {remarkObj: this.data.remarkObj})
        }
      }
    })
  },
  changeLocation() {
    if(wx.getStorageSync('userId')) {
      this.setData({
        changeLocation: true
      })
    } else {
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
  cancleChangeLocation() {
    this.setData({
      changeLocation: false
    })
  },
  selectLocation(e) {
    this.setData({
      changeLocation: false,
      chooseLocation: true,
      user: e.currentTarget.dataset.user
    })
  },
  editLocation(e) {
    wx.navigateTo({
      url: '/pages/WCH/editLocation/editLocation',
      success: res => {
        res.eventChannel.emit('editLocation', {user: e.currentTarget.dataset.user, index: e.currentTarget.dataset.index})
      }
    })
  },
  newLocation() {
    wx.navigateTo({
      url: '/pages/WCH/editLocation/editLocation',
      success: res => {
        res.eventChannel.emit('addNewAddress')
      }
    })
  },
  inputTel(e) {
    this.setData({
      userTel: e.detail.value
    })
  },
  order() {
    // 检查手机号码格式
    if(!this.data.takeAway && !/^1\d{10}$/.test(this.data.userTel)) {
      wx.showToast({
        title: '手机号格式错误，请重新填写!',
        icon: 'none',
      })
    // 检查是否授权
    } else if(!wx.getStorageSync('token')) {
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
    // 检查是否选择收货地址
    } else if(this.data.takeAway && !this.data.chooseLocation) {
      wx.showToast({
        title: '请先选择收货地址!',
        icon: 'none'
      })
    } else {
      // 整个订单大对象
      const order = {
        businessPhone: this.data.storeTelNum,
        deliveryFee: this.data.sendPrice,
        orderCommodities: [],
        remarks: this.data.remark,
        shopAddress: this.data.storeAddress,
        shopId: this.data.shopId,
        // shopId: 1,
        shopName: this.data.shopName,
        shopPicture: this.data.imgUrl || 'a',
        totalAmount: this.data.totalPrice,
        totalQuantity: this.data.totalCount,
        userId: wx.getStorageSync('userId')
      }

      // 是否自提
      if(this.data.takeAway) {
        order.userName = this.data.user.contactName + this.data.user.sex === 1 ? '（先生）' : '（女士）',
        order.userPhone = this.data.user.contactPhone
        order.deliveryAddress = this.data.user.campus + '-' + this.data.user.detailedAddress
      } else {
        order.userPhone = this.data.userTel
      }

      // 每个商品对象
      for(let item of this.data.cartList) {
        let num = item.count ? item.count : item.num
        let food = {
          goodsName: item.name,
          picture: item.imgUrl || 'a',
          quantity: num,
          specification: item.spec,
          totalPrice: num * item.price,
          unitPrice: item.price
        }
        order.orderCommodities.push(food)
      }

      // 是否预约
      if(this.data.index != 0) {
        order.isReserved = 1
        order.reservedTime = this.data.realTime[this.data.index]
      } else {
        order.isReserved = 0
      }

      orderNewOrder(order).then(res => {
        const obj = res.data.data
        obj.userId = wx.getStorageSync('userId')
        // 下单成功
        if(res.statusCode === 200 && res.data.code === 3201) {
          this.pay({
            deliveryFee: obj.deliveryFee,
            orderNumber: obj.orderNumber,
            shopName: obj.shopName,
            totalAmount: obj.totalAmount,
            userId: wx.getStorageSync('userId')
          })
          let a = app.globalData.cartList.find(item => item.shopId === this.data.shopId)
          console.log(a);
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
  },
  pay(data) {
    wx.request({
      url: BASE_URL + '/wechatpay/prePay',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data,
      success: (res) => {
        console.log(res);
        changeOrderStatus({
          orderNumber: data.orderNumber,
          userId: wx.getStorageSync('userId')
        }).then(() => {
          wx.showToast({
            title: '支付成功！'
          })
        })
        wx.navigateTo({
          url: '/pages/WCH/submitOrder/submitOrder',
          success: result => {
            result.eventChannel.emit('submitOrder', {
              cartList: this.data.cartList,
              shopAddress: this.data.storeAddress,
              user: this.data.user,
              storeTelNum: this.data.storeTelNum,
              remark: this.data.remark || '',
              takeAway: this.data.takeAway,
              payTime: new Date().getTime(),
              obj: data,
              isPay: true
            })
          }
        })

        // if (res.data.prepayId != ''){
        //   const map = res.data.data.payMap
        //   wx.requestPayment({
        //     'appId': map.appId,
        //     'timeStamp': map.timeStamp,
        //     'nonceStr': map.nonceStr,
        //     'package': map.package,
        //     'signType': 'MD5',
        //     'paySign': map.paySign,
        //     'success':  (res) => {
        //       if(res.errMsg === 'requestPayment:ok') {
        //         changeOrderStatus({
        //           orderNumber: data.orderNumber,
        //           userId: wx.getStorageSync('userId')
        //         }).then(() => {
        //           wx.showToast({
        //             title: '支付成功！'
        //           })
        //         })
        //       }
        //       wx.navigateTo({
        //         url: '/pages/WCH/submitOrder/submitOrder',
        //         success: result => {
        //           result.eventChannel.emit('submitOrder', {
        //             cartList: this.data.cartList,
        //             shopAddress: this.data.storeAddress,
        //             user: this.data.user,
        //             storeTelNum: this.data.storeTelNum,
        //             remark: this.data.remark || '',
        //             takeAway: this.data.takeAway,
        //             payTime: new Date(),
        //             obj: data,
        //             isPay: true
        //           })
        //         }
        //       })
        //     },
        //     'fail': (error) => {
        //       wx.navigateTo({
        //         url: '/pages/WCH/submitOrder/submitOrder',
        //         success: res => {
        //           // 记录时间
        //           console.log(data);
                  
        //           wx.setStorageSync('time', new Date().getTime() + 900000)
        //           res.eventChannel.emit('submitOrder', {
        //             cartList: this.data.cartList,
        //             shopAddress: this.data.storeAddress,
        //             user: this.data.user,
        //             storeTelNum: this.data.storeTelNum,
        //             remark: this.data.remark || '',
        //             takeAway: this.data.takeAway,
        //             obj: data,
        //             isPay: false
        //           })
        //         }
        //       })
        //     }
        //   })
        // }
      },
      fail: () => {
        wx.showToast({
          title: '支付异常，请重新尝试！',
          icon: 'none'
        })
      }
    });
  },
})