// pages/home/home.js
const BACK_TOP = 500

import { 
  getShopCategory
} from '../../../service/home'

import {
  _getMultiData,
  formatTime
} from '../../../utils/util'

Page({
  data: {
    position: '定位',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png'
    }, {
      id: 1,
        type: 'image',
        url: 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg'
    }],
    categoryList: [],
    storeList: [],
    showBackTop: false,
    pageNum: 1,
    cateImgList: [
      '../../../assets/img/WCH/category/BBQ.png',
      '../../../assets/img/WCH/category/bread.png',
      '../../../assets/img/WCH/category/fast-food.png',
      '../../../assets/img/WCH/category/fruit.png',
      '../../../assets/img/WCH/category/hambur.png',
      '../../../assets/img/WCH/category/noodle.png',
      '../../../assets/img/WCH/category/shop.png',
      '../../../assets/img/WCH/category/tea-milk.png'
    ],
    totalPages: 1,
    showEnd: false
  },
  onLoad() {
    wx.stopPullDownRefresh()

    wx.showLoading({
      title: '加载中...'
    })

    this.setData({
      position: wx.getStorageSync('address') || '定位'
    })

    if(wx.getStorageSync('address')) {
      getShopCategory().then(res => {
        let cateList = res.data.data
        let i = 0
        for(let item of cateList) {
          item.img = this.data.cateImgList[i]
          i++
        }
        this.setData({
          categoryList: res.data.data || []
        })
      })
  
      _getMultiData(
        this.data.position,
        this.data.storeList,
        {
          pageNum: 1
        }
      ).then((res) => {
        this.setData({
          storeList: res.storeList || [],
          totalPages: res.totalPages
        })
        wx.hideLoading()
      })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请刷新重试',
        icon: 'none'
      })
    }
  },
  onShow() {
    
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
  focusSearch() {
    wx.navigateTo({
      url: '/pages/WCH/search/search',
    })
  },
  tapCategory(e) {
    wx.navigateTo({
      url: '/pages/WCH/storeListPage/storeListPage',
      success(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('showStoreList', {title: e.currentTarget.dataset.title})
      }
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
  onReachBottom() {
    if(this.data.pageNum < this.data.totalPages) {
      _getMultiData(
        this.data.position,
        this.data.storeList,
        {
          pageNum: ++this.data.pageNum
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
  onPullDownRefresh() {
    this.setData({
      pageNum: 1
    })
    this.onLoad()
  }
})
