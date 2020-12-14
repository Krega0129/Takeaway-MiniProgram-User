import { getUserTotalOrder, getUnpaidOrder, cancelUnpaidOrder, selectUserPaidOrder } from '../../../service/order';
import { loadingOff, showToast } from '../../../service/config';
import {
  STATECODE_SUCCESS,
  STATECODE_getUserOrderByStatus_SUCCESS,
  STATECODE_getUnpaidOrder_SUCCESS,
  STATECODE_cancelUnpaidOrder_SUCCESS,
  STATECODE_selectUserPaidOrder_SUCCESS
} from '../../../service/config'
let app = getApp()
let bus = app.globalData.bus
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    modalName: '',
    currentType: 'all',
    TabName: ["全部", "待付款", "已付款"],
    // 状态数组
    statusCode: ['allList', 'obligationList', 'paidList'],
    // 全部订单
    allList: [],
    // 待付款订单
    obligationList: [],
    // 已付款订单
    paidList: [],
    // 监听"全部"的页面信息是否为最新信息
    isFresh: true,


  },  // 进入详情页
  goToOrderDetails(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/LSK/orderDetails/orderDetails?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  // 打开模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 关闭模态框
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 复制号码
  copyPhoneNumber() {
    let that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.allList.businessPhone,
      success: function (res) {
        wx.showToast({
          title: '内容已复制',
        });
        that.setData({
          modalName: null
        })
      }
    })
  },
  // 选项卡展示
  tabSelect(e) {
    const index = e.currentTarget.dataset.id
    this.setData({
      TabCur: index,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    if (index === 0) {
      this.setUserTotalOrder()
    } else if (index === 1) {
      this.setUnpaidOrder()
    } else if (index === 2) {
      this.setSelectUserPaidOrder()
    }
  },
  // 格式化数组
  listArrayFormate: function (res) {
    const list = []
    for (let item of res.data.data) {
      // 遍历订单信息
      const order = {
        id: item.id,
        orderId: item.orderId,
        orderNumber: item.orderNumber,
        totalAmount: item.totalAmount,
        deliveryAddress: item.deliveryAddress,
        userPhone: item.userPhone,
        userName: item.userName,
        totalQuantity: item.totalQuantity,
        remarks: item.remarks,
        deliveryFee: item.deliveryFee,
        date: item.date,
        completeTime: item.completeTime,
        commodities: [],
        orderStatus: item.orderStatus,
        deliveryStatus: item.deliveryStatus,
        status: item.status,
        shopName: item.shopName,
        isReserved: item.isReserved,
        reservedTime: item.reservedTime,
        businessPhone: item.businessPhone,
        shopPicture: item.shopPicture,
        shopAddress: item.shopAddress,
        statusCode: this.formatStatusCode(item.status),

      }
      // 遍历商品详情
      for (let item of item.commodities) {
        const commoditie = {
          detailsId: item.detailsId,
          picture: item.picture,
          orderId: item.orderId,
          goodsName: item.goodsName,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          specification: item.specification
        }
        // console.log(commoditie);
        order.commodities.push(commoditie)
      }
      list.push(order)
    }
    return list
  },
  // 获取"全部"订单信息
  setUserTotalOrder: function () {
    let pageNum = 1
    let size = 10
    let userId = 12
    getUserTotalOrder(pageNum, size,userId).then((res) => {
      loadingOff()
      if (res.data.code === STATECODE_SUCCESS || res.data.code == STATECODE_getUserOrderByStatus_SUCCESS) {
        const list = []
        for (let item of res.data.data.list) {
          // 遍历订单信息
          const order = {
            id: item.id,
            orderId: item.orderId,
            orderNumber: item.orderNumber,
            totalAmount: item.totalAmount,
            deliveryAddress: item.deliveryAddress,
            userPhone: item.userPhone,
            userName: item.userName,
            totalQuantity: item.totalQuantity,
            remarks: item.remarks,
            deliveryFee: item.deliveryFee,
            date: item.date,
            completeTime: item.completeTime,
            commodities: [],
            orderStatus: item.orderStatus,
            deliveryStatus: item.deliveryStatus,
            status: item.status,
            shopName: item.shopName,
            isReserved: item.isReserved,
            reservedTime: item.reservedTime,
            businessPhone: item.businessPhone,
            shopPicture: item.shopPicture,
            shopAddress: item.shopAddress,
            statusCode: this.formatStatusCode(item.status)
          }
          // 遍历商品详情
          for (let item of item.commodities) {
            const commoditie = {
              detailsId: item.detailsId,
              picture: item.picture,
              orderId: item.orderId,
              goodsName: item.goodsName,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              specification: item.specification
            }
            // console.log(commoditie);
            order.commodities.push(commoditie)
          }
          list.push(order)
        }
        this.setData({
          allList: list,
          isFresh: true
        })
      }
    })
  },
  // 获取"待付款"订单信息
  setUnpaidOrder() {
    let userId=12
    getUnpaidOrder(userId).then((res) => {
      if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_getUnpaidOrder_SUCCESS) {
        loadingOff()
        showToast('订单刷新成功', 1000)
        const list = []
        for (let item of res.data.data) {
          // 遍历订单信息
          const order = {
            orderId: item.orderId,
            orderNumber: item.orderNumber,
            totalAmount: item.totalAmount,
            shopName: item.shopName,
            deliveryAddress: item.deliveryAddress,
            userPhone: item.userPhone,
            userName: item.userName,
            remarks: item.remarks,
            paymentTime: item.paymentTime,
            receiveTime: item.receiveTime,
            deliveryTime: item.deliveryTime,
            completeTime: item.completeTime,
            isReserved: item.isReserved,
            reservedTime: item.reservedTime,
            deliveryFee: item.deliveryFee,
            businessPhone: item.businessPhone,
            shopPicture: item.shopPicture,
            shopAddress: item.shopAddress,
            totalQuantity: item.totalQuantity,
            userId: item.userId,
            // date: item.date,
            commodities: [],
            // timeDifference: item.timeDifference,
            // orderStatus: item.orderStatus,
            // deliveryStatus: item.deliveryStatus,
            status: item.status,
            timeStamp: item.timeStamp,
            countDownStamp:null,
            countDown: '',
          }
          // 遍历商品详情
          for (let item of item.orderCommodities) {
            const commodity = {
              detailsId: item.detailsId,
              picture: item.picture,
              orderId: item.orderId,
              goodsName: item.goodsName,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              specification: item.specification
            }
            order.commodities.push(commodity)
          }
          list.push(order)
        }
        this.setData({
          obligationList: list
        })
        this.getCountDown()
      }
      else {
        loadingOff()
        showToast('请求失败', 2000)
      }
    })
  },
  // 获取"已付款"订单信息
  setSelectUserPaidOrder() {
    let userId=12
    selectUserPaidOrder(userId).then((res) => {
      if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_selectUserPaidOrder_SUCCESS) {
        loadingOff()
        let list = this.listArrayFormate(res)
        this.setData({
          paidList: list
        })
      }
    })
  },
  // 倒计时格式化
  dateformat: function (micro_second) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 总小时
    var hr = Math.floor(second / 3600);
    // 小时位
    var hr2 = hr % 24;
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = (second - hr * 3600 - min * 60)// equal to => var sec = second % 60;
    //  var micro_sec = Math.floor((micro_second % 1000) / 10);
    return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
  },
  // 获取倒计时    
  getCountDown() {
    let obligationList = this.data.obligationList
    for (let item of obligationList) {
      let orderTime = item.timeStamp
      let nowTime = new Date().getTime()
      let seconds = (15 * 60 * 1000 + orderTime) - nowTime
      item.countDownStamp = seconds    
    }
    this.setData({
      obligationList:obligationList
    })
    this.setCountDown(obligationList)
  },
  setCountDown(obligationList){
    // for (let item of obligationList) {
    //   let timer= setInterval(() => {
    //     item.countDownStamp-=1000
    //     item.countDown=this.dateformat(item.countDownStamp)
    //     if(item.countDownStamp<=0){
    //       clearInterval(timer)
    //     }
    //     this.setData({
    //       obligationList:obligationList
    //     })
    //   }, 1000);   
    // }
  },
  // 取消订单
  cancelOrder: function (e) {
    let list = this.data.obligationList
    let orderNumber = e.currentTarget.dataset.ordernumber
    let index = e.currentTarget.dataset.id
    cancelUnpaidOrder(orderNumber).then((res) => {
      if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_cancelUnpaidOrder_SUCCESS) {
        loadingOff()
        showToast('订单取消成功', 2000)
        // setTimeout(()=> {
        //   this.setUnpaidOrder()
        //  }, 1000)
        list.splice(index-1,1)
        this.setData({
          obligationList:list
        })
      }
    })
  },
  // 根据状态码获取状态
  formatStatusCode: function (status) {
    let statusCode = ''
    if (status === 0) {
      statusCode = '待付款'
    } else if (status === 1 || status === 2) {
      statusCode = '待接单'
    } else if (status === 3) {
      statusCode = '待取货'
    } else if (status === 4) {
      statusCode = '待送达'
    } else if (status === 5) {
      statusCode = '已完成'
    } else if (status === 6) {
      statusCode = '已退款'
    } else if (status === 7) {
      statusCode = '订单取消'
    }
    return statusCode
  },
  // 手动刷新"全部"订单
  refreshAllList: function () {
    this.setSelectUserPaidOrder()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUserTotalOrder()
    this.setSelectUserPaidOrder()
    this.setUnpaidOrder()
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
    const that = this
    bus.on('orderMsg', function (orderMsg) {
      const obligationList = that.data.obligationList
      let paidList = that.data.paidList
      let orderNumber = orderMsg.orderNumber
      console.log(paidList);
      if (orderMsg.currentStatus === 0) {
        obligationList.unshift(orderMsg.data)
        that.getCountDown()
      }
      else if (orderMsg.currentStatus === 1 && orderMsg.pastStatus === 0) {
        let orderItem = paidList.find(res => res.orderNumber = orderNumber)
        console.log(orderItem);
        orderItem.statusCode = '待接单'
      }
      else if (orderMsg.currentStatus === 2 && orderMsg.pastStatus === 1) {
        let orderItem = paidList.find(res => res.orderNumber = orderNumber)
        console.log(orderItem);
        orderItem.statusCode = '待接单'
      }
      else if (orderMsg.currentStatus === 3) {
        let orderItem = paidList.find(res => res.orderNumber = orderNumber)
        console.log(orderItem);
        orderItem.statusCode = '待取货'
      }
      else if (orderMsg.currentStatus === 4) {
        let orderItem = paidList.find(res => res.orderNumber === orderNumber)
        orderItem.statusCode = '待送达'
      }
      else if (orderMsg.currentStatus === 7) {
        for (let index = 0; index < obligationList.length; index++) {
          if (orderMsg.orderNumber === obligationList[index].orderNumber) {
            obligationList.splice(index - 1, 1)
            return
          }
        }
      }
      that.setData({
        obligationList: obligationList,
        paidList: paidList,
        isFresh: false
      })
      if (!that.data.isFresh && that.data.TabCur === 0) {
        showToast('订单信息发生改变，请手动刷新', 2000)
      }
    })
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