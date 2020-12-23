// pages/search/search.js
const app = getApp()

import {
  searchTip
} from '../../../service/home'

Page({
  data: {
    foodList: [],
    storeList: [],
    searchHistoryList: wx.getStorageSync('searchFoodHistoryList'),
    showSearchTip: false,
    showHistory: false,
    timer: true,
    inputText: ''
  },
  onLoad: function (options) {
    
  },
  onShow: function() {
    if(wx.getStorageSync('searchFoodHistoryList') && wx.getStorageSync('searchFoodHistoryList')[0]) {
      this.setData({
        searchHistoryList: wx.getStorageSync('searchFoodHistoryList'),
        showHistory: true,
        inputText: '',
        showSearchTip: false
      })
    }
    this.setData({
      storeList: [],
      foodList: []
    })
  },
  search() {
    let list = wx.getStorageSync('searchFoodHistoryList')
    // 记录中存在，先删除存在的
    if(-1 !== list.indexOf(this.data.inputText)) {
      let index = list.indexOf(this.data.inputText)
      list.splice(index, 1)
    }
    // 在前面插入一个记录
    list.unshift(this.data.inputText)
    this.data.searchHistoryList = list
    // 超过5条记录就删除
    if(wx.getStorageSync('searchFoodHistoryList').length >= 6) {
      list.pop()
    }

    wx.setStorageSync('searchFoodHistoryList', list)

    wx.navigateTo({
      url: '/pages/WCH/storeListPage/storeListPage',
      success: (res) => {
        res.eventChannel.emit('showSearchList', {title: this.data.inputText})
      }
    })
  },
  searchFood(e) {
    let tim = setTimeout(() => {
      this.data.timer = true
    }, 500)
    if(this.data.timer) {
      // 更新搜索记录
      let list = wx.getStorageSync('searchFoodHistoryList')
      // 记录中存在，先删除存在的
      if(-1 !== list.indexOf(e.currentTarget.dataset.food)) {
        let index = list.indexOf(e.currentTarget.dataset.food)
        list.splice(index, 1)
      }
      // 在前面插入一个记录
      list.unshift(e.currentTarget.dataset.food)
      // 不需要实时更新
      this.data.searchHistoryList = list
      // 超过5条记录就删除
      if(wx.getStorageSync('searchFoodHistoryList').length >= 6) {
        list.pop()
      }
      this.data.timer = false
      wx.setStorageSync('searchFoodHistoryList', list)

      wx.navigateTo({
        url: '/pages/WCH/storeListPage/storeListPage',
        success(res) {
          res.eventChannel.emit('showSearchList', {title: e.currentTarget.dataset.food})
        }
      })
    }
  },
  deleteSearchHistory(e) {
    const index = e.currentTarget.dataset.index
    let list = wx.getStorageSync('searchFoodHistoryList')
    list.splice(index, 1)
    wx.setStorageSync('searchFoodHistoryList', list)
    this.setData({
      searchHistoryList: wx.getStorageSync('searchFoodHistoryList')
    })
    // 是否已经全部删除
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
    // 实时更新input数据
    this.setData({
      inputText: e.detail.value
    })

    if(e.detail.value) {
      searchTip({
        address: wx.getStorageSync('address') || '',
        word: e.detail.value
      }).then(res => {
        this.setData({
          storeList: res.data.data.shopName,
          foodList: res.data.data.commodityName
        })
      })
    } else {
      this.setData({
        storeList: [],
        foodList: []
      })
    }

    // if(!e.detail.value) {
    //   this.setData({
    //     showSearchTip: false
    //   })
    // } else {
    //   this.setData({
    //     showSearchTip: true
    //   })
    // }
  }
})