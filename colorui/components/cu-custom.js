const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    isLocated: {
      type: [Boolean, String],
      default: false
    },
    isRedirectPage: {
      type: [Boolean, String],
      default: false
    },
    delta: {
      type: [Number, String],
      default: 1
    },
    url: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: Number(this.data.delta)
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/WCH/home/home',
      })
    },
    selctPosition() {
      wx.navigateTo({
        url: '/pages/WCH/location/location?canback=' + 1,
      })
    },
    redirectPage() {
      let pages = getCurrentPages()
    
      // 判断前一页是否是备注页面
      if('/pages/WCH/bill/bill' === pages[pages.length - 2].route) {
        wx.navigateBack()
      }else {
        wx.redirectTo({
          url: '/pages/WCH/bill/bill'
        })
      }
    }
  }
})