// pages/WCH/bill/bill.js
import {
  getAllAddress,
  orderNewOrder,

} from '../../../service/bill'

const app = getApp()
Page({
  data: {
    shopId: null,
    shopName: null,
    imgUrl: null,
    cartList: [],
    totalPrice: 0,
    sendPrice: 2,
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
    picker: ['立即'],
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

    // 获取当前时间
    let date = new Date()
    let i = 1
    for(;i < 8; i++) {
      let hour = date.getHours()
      let min = date.getMinutes()
      if(min + 15 * i >= 60) {
        hour = hour + (min + 15 * i) / 60
      }
      min = min + 15 * i

      hour = parseInt(hour)
      min = parseInt(min)
      this.data.picker.push(this.formatNumber(hour % 24) + ':' + this.formatNumber(min % 60))
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

    getAllAddress().then(res => {
      let addressList = res.data.data
      
      this.setData({
        locationList: addressList
      })
    })
  },
  onShareAppMessage: function () {

  },
  formatNumber: n => {
    n = n.toString()
    return n[1] ? n : '0' + n
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
    this.setData({
      changeLocation: true
    })
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
    
    // 整个订单大对象
    const order = {
      businessPhone: this.data.storeTelNum,
      deliveryFee: this.data.sendPrice,
      orderCommodities: [],
      remarks: this.data.remark,
      shopAddress: this.data.storeAddress,
      shopId: this.data.shopId,
      shopName: this.data.shopName,
      shopPicture: this.data.imgUrl,
      totalAmount: this.data.totalPrice,
      totalQuantity: this.data.totalCount,
      userId: 1
    }

    // 是否自提
    if(this.data.takeAway) {
      order.userName = this.data.user.contactName,
      order.userPhone = this.data.user.contactPhone
      order.deliveryAddress = this.data.user.campus + this.data.user.detailedAddress
    } else {
      order.userPhone = this.data.userTel
    }

    // 每个商品对象
    for(let item of this.data.cartList) {
      let num = item.count ? item.count : item.num
      let food = {
        goodsName: item.name,
        picture: item.imgUrl,
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
    } else {
      order.isReserved = 0
    }

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
              res.eventChannel.emit('code',{code: code})
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
      orderNewOrder(order).then(res => {
        console.log(res);
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

          // wx.navigateTo({
          //   url: '/pages/WCH/submitOrder/submitOrder',
          //   success: res => {
          //     res.eventChannel.emit('submitOrder', {
          //       cartList: this.data.cartList,
          //       shopName: this.data.shopName,
          //       shopAddress: this.data.storeAddress,
          //       user: this.data.user,
          //       sendPrice: this.data.sendPrice,
          //       totalPrice: this.data.totalPrice,
          //       storeTelNum: this.data.storeTelNum,
          //       remark: this.data.remark || '',
          //       takeAway: this.data.takeAway,
          //       orderNum: orderNum,
          //       isPay: false
          //     })
          //   }
          // })
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
      url: 'http://192.168.43.63:8080/wechatpay/prePay',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data,
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
            'success':  (paymentRes) => {
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
                    obj: data,
                    isPay: true
                  })
                }
              })
              // that.setData({
              //   notPay: true,
              //   paySuccess: false,
              //   teamNotPay: true,
              //   button:true,
              //   outTradeNo: outTradeNo,
              //   payDate:new Date()
              // })
            },
            fail: (error) => {
              wx.navigateTo({
                url: '/pages/WCH/submitOrder/submitOrder',
                success: res => {
                  res.eventChannel.emit('submitOrder', {
                    cartList: this.data.cartList,
                    shopAddress: this.data.storeAddress,
                    user: this.data.user,
                    storeTelNum: this.data.storeTelNum,
                    remark: this.data.remark || '',
                    takeAway: this.data.takeAway,
                    obj: data,
                    isPay: false
                  })
                }
              })
            }
          })
        }
      }
    });
  },
})