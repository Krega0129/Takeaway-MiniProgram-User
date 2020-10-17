// pages/storeListPage/storeListPage.js
Page({
  data: {
    title: ''
  },
  onLoad: function (options) {
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('showStoreList', (data) => {
      this.setData({
        title: data.title
      })
    })
    eventChannel.on('showSearchList', (data) => {
      this.setData({
        title: data.title
      })
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  focusSearch() {
    let pages = getCurrentPages()
    
    // 判断前一页是否是搜索页面，是则直接返回，否则跳转搜索页面
    if('pages/WCH/search/search' === pages[pages.length - 2].route) {
      wx.navigateBack()
    }else {
      wx.redirectTo({
        url: '/pages/WCH/search/search',
      })
    }
  }
})