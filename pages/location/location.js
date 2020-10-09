// pages/location/location.js
const app = getApp()
Page({
  data: {
    nowLocation: '',
    schoolList: ['广东工业大学', '广州大学', '华南理工大学', '中山大学', '暨南大学', '北京大学', '广美'],
    // schoolList: ['广东工业大学', '广州大学', '华南理工大学', '中山大学', '暨南大学', '清华大学', '北京大学', '广美', '人大', '上交大', '复旦大学', '厦门大学', '浙江大学'],
    searchHistoryList: wx.getStorageSync('searchSchoolHistoryList'),
    showSearchTip: false,
    showHistory: false
  },
  onLoad: function (options) {
    this.setData({
      nowLocation: app.globalData.nowLocation
    })
  },
  onShow: function() {
    if(wx.getStorageSync('searchSchoolHistoryList') && wx.getStorageSync('searchSchoolHistoryList')[0]) {
      this.setData({
        searchHistoryList: wx.getStorageSync('searchSchoolHistoryList'),
        showHistory: true
      })
    }
  },
  cancelLocate() {
    wx.navigateBack()
  },
  reLocate(e) {
    // 提示框
    wx.showModal({
      content: '将' + e.currentTarget.dataset.location + '设置为当前位置？',
      showCancel: true,
      title: '提示',
      success: (res) => {
        if(res.confirm) {
          app.globalData.nowLocation = e.currentTarget.dataset.location

          // 修改当前定位
          this.setData({
            nowLocation: app.globalData.nowLocation
          })

          // 更新搜索记录
          let list = wx.getStorageSync('searchSchoolHistoryList')
          // 记录中存在，先删除存在的
          if(-1 !== list.indexOf(e.currentTarget.dataset.location)) {
            let index = list.indexOf(e.currentTarget.dataset.location)
            list.splice(index, 1)
          }
          // 在前面插入一个记录
          list.unshift(e.currentTarget.dataset.location)
          this.setData({
            searchHistoryList: list
          })
          // 超过5条记录就删除
          if(wx.getStorageSync('searchSchoolHistoryList').length >= 5) {
            list.pop()
          }

          wx.setStorageSync('searchSchoolHistoryList', list)
          wx.navigateBack()
        }
      }
    })
  },
  deleteSearchHistory(e) {
    const index = e.currentTarget.dataset.index
    let list = wx.getStorageSync('searchSchoolHistoryList')
    list.splice(index, 1)
    wx.setStorageSync('searchSchoolHistoryList', list)
    this.setData({
      searchHistoryList: wx.getStorageSync('searchSchoolHistoryList')
    })
    // 是否全部删除
    if(0 === wx.getStorageSync('searchSchoolHistoryList').length) {
      this.setData({
        showHistory: false
      })
    }
  },
  clearAllSearchHistory() {
    // 清除
    wx.setStorageSync('searchSchoolHistoryList', [])
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