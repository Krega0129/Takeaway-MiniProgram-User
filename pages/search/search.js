// pages/search/search.js
const app = getApp()
Page({
  data: {
    foodList: ['鸡扒饭', '铁板饭', '炒饭', '汉堡', '炸鸡', '奶茶', '烤串'],
    searchHistoryList: wx.getStorageSync('searchFoodHistoryList'),
    showSearchTip: false,
    showHistory: false
  },
  onLoad: function (options) {
    
  },
  onShow: function() {
    if(wx.getStorageSync('searchFoodHistoryList') && wx.getStorageSync('searchFoodHistoryList')[0]) {
      this.setData({
        searchHistoryList: wx.getStorageSync('searchFoodHistoryList'),
        showHistory: true
      })
    }
  },
  cancelLocate() {
    wx.navigateBack()
  },
  searchFood(e) {
    // 更新搜索记录
    let list = wx.getStorageSync('searchFoodHistoryList')
    // 记录中存在，先删除存在的
    if(-1 !== list.indexOf(e.currentTarget.dataset.food)) {
      let index = list.indexOf(e.currentTarget.dataset.food)
      list.splice(index, 1)
    }
    // 在前面插入一个记录
    list.unshift(e.currentTarget.dataset.food)
    this.setData({
      searchHistoryList: list
    })
    // 超过5条记录就删除
    if(wx.getStorageSync('searchFoodHistoryList').length >= 5) {
      list.pop()
    }

    wx.setStorageSync('searchFoodHistoryList', list)
    wx.navigateBack()
  },
  deleteSearchHistory(e) {
    const index = e.currentTarget.dataset.index
    let list = wx.getStorageSync('searchFoodHistoryList')
    list.splice(index, 1)
    wx.setStorageSync('searchFoodHistoryList', list)
    this.setData({
      searchHistoryList: wx.getStorageSync('searchFoodHistoryList')
    })
    // 是否全部删除
    if(0 === wx.getStorageSync('searchFoodHistoryList').length) {
      this.setData({
        showHistory: false
      })
    }
  },
  clearAllSearchHistory() {
    // 清除
    wx.setStorageSync('searchFoodHistoryList', [])
    this.setData({
      showHistory: false
    })
  },
  inputSearch(e) {
    if(!e.detail.value) {
      this.setData({
        showSearchTip: false
      })
    } else {
      this.setData({
        showSearchTip: true
      })
    }
  }
})