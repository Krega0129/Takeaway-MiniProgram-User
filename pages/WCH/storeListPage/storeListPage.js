// pages/storeListPage/storeListPage.js
import {
  _getMultiData
} from '../../../utils/util'

const app = getApp()

Page({
  data: {
    category: null,
    keyWord: null,
    position: wx.getStorageSync('address') || '',
    currentPage: 1,
    storeList: [],
    totalPages: 0,
    showEnd: false,
  },
  onLoad: function (options) {
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('showStoreList', (data) => {
      this.setData({
        category: data.title,
        position: wx.getStorageSync('address')
      })
    })
    eventChannel.on('showSearchList', (data) => {
      this.setData({
        keyWord: data.title
      })
    })

    _getMultiData(
      this.data.position,
      this.data.storeList,
      {
        pageNum: 1,
        category: this.data.categoryName,
        keyWord: this.data.keyWord
      }
    ).then(res => {
      this.setData({
        storeList: res.storeList,
        totalPages: res.totalPages
      })
    })
  },
  onShow() {
    for(let store of this.data.storeList) {
      store.addCart = false
    }
    for(let item of app.globalData.cartList) {
      let shop = this.data.storeList.find(store => (store.shopId === item.shopId) && item.foodList[0])
      if(shop) {
        let num = 0;
        for(let food of item.foodList) {
          num += food.num
        }
        shop.addCart = true
        shop.num = num
      } 
    }
    this.setData({
      storeList: this.data.storeList
    })
  },
  showStoreDetails(e) {
    const shopInfo = e.currentTarget.dataset.shopinfo
    wx.navigateTo({
      url: '/pages/WCH/storeDetails/storeDetails',
      success: res => {
        res.eventChannel.emit('sendStoreInfo', {shopId: shopInfo.shopId})
      }
    })
  },
  onReachBottom: function () {
    if(this.data.currentPage < this.data.totalPages) {
      _getMultiData(
        this.data.position,
        this.data.storeList,
        {
          pageNum: ++this.data.currentPage,
          category: this.data.categoryName,
          keyWord: this.data.keyWord
        }
      ).then(() => {
        this.setData({
          storeList: this.data.storeList
        })
      })
    } else {
      this.setData({
        showEnd: true
      })
    }
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