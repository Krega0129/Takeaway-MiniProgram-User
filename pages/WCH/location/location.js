// pages/location/location.js
import {
  getCampus
} from '../../../service/home'

const app = getApp()

Page({
  data: {
    nowLocation: '',
    currentPage: 1,
    // schoolList: ['广东工业大学', '广州大学', '华南理工大学', '中山大学', '暨南大学', '清华大学', '北京大学', '广美', '人大', '上交大', '复旦大学', '厦门大学', '浙江大学', '广东工业大学', '广州大学', '华南理工大学', '中山大学', '暨南大学', '清华大学', '北京大学', '广美', '人大', '上交大', '复旦大学', '厦门大学', '浙江大学'],
    schoolList: [],
    canBack: 1,
    totalPages: 1
  },
  onLoad: function (options) {
    this.setData({
      canBack: Number(options.canback)
    })
    // 获取第一页
    this._getCampus(1)
    this.setData({
      nowLocation: wx.getStorageSync('address') || '未定位'
    })
  },
  _getCampus(currentPage) {
    getCampus({
      pageNum: currentPage,
      pageSize: 15
    }).then(res => {
      let list = res.data.data.list
      let campusList = []
      for(let campus of list) {
        campusList.push(campus.campusName)
      }
      this.data.totalPages = res.data.data.totalPages
      this.data.schoolList.push(...campusList)
      this.setData({
        schoolList: this.data.schoolList
      })
    })
  },
  cancelLocate() {
    wx.navigateBack()
  },
  scrollToLower() {
    if(this.data.currentPage < this.data.totalPages) {
      this._getCampus(++this.data.currentPage)
    }
  },
  reLocate(e) {
    // 提示框
    wx.showModal({
      content: '将' + e.currentTarget.dataset.location + '设置为当前位置？',
      showCancel: true,
      title: '提示',
      success: (res) => {
        if(res.confirm) {
          // app.globalData.nowLocation = e.currentTarget.dataset.location
          wx.setStorageSync('address', e.currentTarget.dataset.location)
          // 修改当前定位
          this.setData({
            nowLocation: wx.getStorageSync('address')
          })
          wx.reLaunch({
            url: '/pages/WCH/home/home',
          })
        }
      }
    })
  }
})