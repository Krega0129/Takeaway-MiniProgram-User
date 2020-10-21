// pages/WCH/bill/bill.js
const app = getApp()
Page({
  data: {
    cartList: app.globalData.cartList,
    totalPrice: app.globalData.totalPrice,
    sendPrice: 2,
    packPrice: 1,
    chooseLocation: false,
    changeLocation: false,
    locationList: [
      {
        name: '张三',
        sex: '先生',
        telNum: '18319328003',
        school: '广东工业大学生活西区',
        room: '西三433宿舍'
      },
      {
        name: '李四',
        sex: '先生',
        telNum: '19120333220',
        school: '广东工业大学生活西区',
        room: '西三433宿舍'
      },
      {
        name: '努尔买买提·哈吉',
        sex: '先生',
        telNum: '17324741847',
        school: '广东工业大学生活西区',
        room: '西三433宿舍'
      }
    ],
    user: {
      name: '吴先生',
      sex: '先生',
      telNum: '18319328003',
      school: '广东工业大学（大学城校区）',
      room: '西三433宿舍'
    },
    takeAway: true,
    storeAddress: '',
    // 自提预留手机号
    userTel: null,
    // 配送时间
    index: 0,
    // 修改第几个地址，null为没修改
    locationIndex: null,
    picker: ['立即送出', '10分钟后送出', '20分钟后送出', '30分钟后送出'],
    // 餐具
    ind: null,
    tableWare: ['不要餐具', '1份', '2份', '三份'],
    // 用来记录备注信息，以备二次编辑
    remarkObj: null,
    remark: '',
  },
  onLoad: function (options) {

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
    eventChannel.on('emitStoreAddress', data => {
      this.setData({
        storeAddress: data.storeAddress
      })
    })

    if(this.data.locationIndex != null) {
      this.data.locationList[this.data.locationIndex] = this.data.user
      this.setData({
        locationList: this.data.locationList
      })
    }
    
    this.setData({
      cartList: app.globalData.cartList,
      totalPrice: app.globalData.totalPrice
    })
  },
  onShareAppMessage: function () {

  },
  takeAway() {
    this.setData({
      takeAway: true,
      sendPrice: 2
    })
  },
  selfTake() {
    this.setData({
      takeAway: false,
      sendPrice: 0
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
      url: '/pages/WCH/NewLocation/newLocation'
    })
  }
})