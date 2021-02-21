// pages/WCH/expressDetails/expressDetails.js
Page({
  data: {
    order: {
      expressType: '顺丰速递',
      pickUpType: '菜鸟驿站',
      campus: '广工校区',
      distributionFee: 1.00,
      pickUpAddress: '广东工业大学生活西区7号蜂巢柜',
      serviceAddress: '广东工业大学生活西区3栋433',
      pickUpCode: '123456',
      specifications: '小件',
      expressContent: 'Javascript从入门到放弃',
      addresseeName: '吴昌辉',
      addresseePhone: '18319328003',
      riderName: '李泽强',
      riderPhone: '19120333220',
      status: 3
    },
    status: ['等待骑手接单...', '待送达', '已完成', '订单异常'],
    statusColor: ['blue', 'orange', 'green', 'red']
  },
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('expressDetails', data => {
      this.setData({
        order: data.item
      })
      console.log(this.data.order);
    })
  },
  onShow: function () {

  }
})