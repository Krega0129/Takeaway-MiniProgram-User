// pages/location/location.js
import {
  getCampus
} from '../../../service/home'

const BACK_TOP = 500

Page({
  data: {
    toBottom: 260,
    triggered: false,
    nowLocation: '',
    currentPage: 1,
    schoolList: [],
    canBack: 1,
    totalPages: 1,
    showEnd: false,
    showBackTop: false
  },
  async onLoad(options) {
    wx.createSelectorQuery().select('.address').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        toBottom: res[0].bottom * 2,
        canBack: Number(options ? options.canback : this.data.canBack),
        nowLocation: wx.getStorageSync('address') || '未定位'
      })
    })
    // 获取第一页
    this._getCampus(1)
  },
  _getCampus(currentPage) {
    if(currentPage <= this.data.totalPages) {
      getCampus({
        pageNum: currentPage,
        pageSize: 15
      }).then(res => {
        wx.hideLoading()
        this.data.totalPages = res.data.data.total
        this.data.schoolList.push(...res.data.data.list)
        this.setData({
          schoolList: this.data.schoolList
        })
      })
    } else {
      this.setData({
        showEnd: true
      })
    }
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
      content: '将' + e.currentTarget.dataset.location.campusName + '设置为当前位置？',
      showCancel: true,
      title: '提示',
      success: (res) => {
        if(res.confirm) {
          console.log(e.currentTarget.dataset.location);
          
          wx.setStorageSync('address', e.currentTarget.dataset.location.campusName)
          wx.setStorageSync('campusId', e.currentTarget.dataset.location.campusId)
          wx.setStorageSync('sendPrice', Number(e.currentTarget.dataset.location.campusCost).toFixed(2))
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
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag = scrollTop >= BACK_TOP

    if(flag !== this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  },
  onRefresh() {
    this.data.schoolList = []
    this.setData({
      triggered: true,
      currentPage: 1,
      showEnd: false
    })
    this.onLoad().then(() => {
      this.setData({
        triggered: false
      })
    })
  }
})