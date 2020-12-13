// components/LSK/l-orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {


  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToOrderDetails() {
      wx.navigateTo({
        url: '/pages/orderDetails/orderDetails',
      })
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  }
})
