// pages/storeDetails/storeDetails.js
const app = getApp()
Page({
  data: {
    totalPrice: app.globalData.totalPrice,
    totalCount: app.globalData.totalCount,
    storeName: '店家名称',
    storeIntro: '商家简介商家简介商家简介商家简介商家简介商家简介商家简介商家简介商家简介',
    storeAddress: '小谷围街南亭村南亭大道',
    storeNotice: '商家公告商家公告商家公告商家公告商家公告商家公告商家公告商家公告商家公告商家公告',
    TabCur: 0,
    TabIndex: 0,
    tabTitleList: ['点餐', '商家'],
    showBottomDialog: false,
    showStoreIntro: false,
    showFoodDetails: false,
    showCartList: false,
    // 商品的详情信息
    foodDetails: {},
    // 垂直导航栏当前id
    MainCur: 0,
    VerticalNavTop: 0,
    // 购物车列表
    cartList: app.globalData.cartList,
    // 后台获取的信息
    goodsCategoryList: [
      {
        id: 0,
        title: '热销',
        foodsList: [
          {
            id: 0,
            name: '手打牛丸',
            intro: '好吃好吃好吃好吃好吃好吃好吃好吃好吃',
            monthSells: 1000,
            price: 10,
            num: 0
          },
          {
            id: 1,
            name: '鸡扒饭',
            intro: '还行还行还行还行还行还行还行还行还行',
            monthSells: 999,
            price: 12,
            num: 0
          },
          {
            id: 2,
            name: '猛男炒饭',
            intro: '也就那样也就那样也就那样也就那样也就那样',
            monthSells: 888,
            price: 9,
            num: 0
          },
        ]
      },
      {
        id: 1,
        title: '全球美食qqqqqqqqq',
        foodsList: [
          {
            id: 3,
            name: '鸭血粉丝',
            intro: '好吃好吃好吃好吃好吃好吃好吃好吃好吃',
            monthSells: 1000,
            price: 10,
            num: 0
          },
          {
            id: 4,
            name: '关东煮',
            intro: '还行还行还行还行还行还行还行还行还行',
            monthSells: 999,
            price: 12,
            num: 0
          },
          {
            id: 5,
            name: '鸡肉卷',
            intro: '也就那样也就那样也就那样也就那样也就那样',
            monthSells: 888,
            price: 9,
            num: 0
          }
        ]
      },
      {
        id: 2,
        title: '特色菜系',
        foodsList: [
          {
            id: 6,
            name: '章鱼丸子',
            intro: '好吃好吃好吃好吃好吃好吃好吃好吃好吃',
            monthSells: 1000,
            price: 10,
            num: 0
          },
          {
            id: 7,
            name: '鸡蛋灌饼',
            intro: '还行还行还行还行还行还行还行还行还行',
            monthSells: 999,
            price: 12,
            num: 0
          },
          {
            id: 8,
            name: '炒粉',
            intro: '也就那样也就那样也就那样也就那样也就那样',
            monthSells: 888,
            price: 9,
            num: 0
          },
        ]
      }
    ],
    list: [],
    load: true
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < this.data.goodsCategoryList.length; i++) {
      list[i] = {};
      list[i].name = this.data.goodsCategoryList[i].title;
      list[i].id = i;
    }

    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  onShow() {
    if(app.globalData.cartList[0]) {
      for(let item of this.data.goodsCategoryList) {
        for(let food of app.globalData.cartList) {
          let cartFood = item.foodsList.find(goods => goods.id === food.id)
          if(cartFood) {
            cartFood.num = food.count
          }
        }
      }
      this.setData({
        totalCount: app.globalData.totalCount,
        goodsCategoryList: this.data.goodsCategoryList,
        cartList: app.globalData.cartList,
        totalPrice: app.globalData.totalPrice
      })
    }
  },
  // 商家简介
  showStoreIntro() {
    this.setData({
      showStoreIntro: true
    })
  },
  hideStoreIntro() {
    this.setData({
      showStoreIntro: false
    })
  },
  // 商品列表滑倒底部
  reachBottom() {
      let list = this.data.list
      this.setData({
        TabCur: list[list.length - 1].id
      })
  },
  // 水平导航
  tapTabIndex(e) {
    this.setData({
      TabIndex: e.currentTarget.dataset.id
    })
  },
  // 垂直导航
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  addSingleFood() {
    // 选中的商品
    const goodsObj = {}

    goodsObj.id = this.data.foodDetails.id
    goodsObj.name = this.data.foodDetails.name
    goodsObj.price = this.data.foodDetails.price

    app.addToCart(goodsObj)
    let foodInfo = null

    // 改变对象里的数据
    for(let item of this.data.goodsCategoryList) {
      const a = item.foodsList
      foodInfo = a.find(item => item.id === this.data.foodDetails.id)
      if(foodInfo) {
        foodInfo.num++
        this.data.foodDetails.num++
        app.globalData.totalCount++
        app.globalData.totalPrice += foodInfo.price
      }
    }

    this.setData({
      cartList: app.globalData.cartList,
      goodsCategoryList: this.data.goodsCategoryList,
      totalPrice: app.globalData.totalPrice,
      totalCount: app.globalData.totalCount
    })
  },
  addGoods(e) {
    // 选中的商品
    const goodsItem = e.currentTarget.dataset.food
    const goodsObj = {}

    goodsObj.id = goodsItem.id
    goodsObj.name = goodsItem.name
    goodsObj.price = goodsItem.price

    app.addToCart(goodsObj)
    let foodInfo = null

    // 改变对象里的数据
    for(let item of this.data.goodsCategoryList) {
      const a = item.foodsList
      foodInfo = a.find(item => item.id === goodsItem.id)
      if(foodInfo) {
        foodInfo.num++
        goodsItem.num++
        app.globalData.totalCount++
        app.globalData.totalPrice += foodInfo.price
      }
    }

    this.setData({
      cartList: app.globalData.cartList,
      goodsCategoryList: this.data.goodsCategoryList,
      totalPrice: app.globalData.totalPrice,
      totalCount: app.globalData.totalCount
    })
  },
  removeGoods(e) {
    const goodsItem = e.currentTarget.dataset.food

    let foodInfo = null
    const cartFood = app.globalData.cartList.find(item => item.id === goodsItem.id)

    for(let item of this.data.goodsCategoryList) {
      const a = item.foodsList
      foodInfo = a.find(item => item.id === goodsItem.id)
      if(foodInfo && foodInfo.num > 0) {
        foodInfo.num--
        goodsItem.num--
        cartFood.count--
        app.globalData.totalPrice -= foodInfo.price
        app.globalData.totalCount--
        if(cartFood.count <= 0) {
          const index = app.globalData.cartList.indexOf(cartFood)
          app.globalData.cartList.splice(index, 1)
        }
      }
    }

    this.setData({
      cartList: app.globalData.cartList,
      goodsCategoryList: this.data.goodsCategoryList,
      totalPrice: app.globalData.totalPrice,
      totalCount: app.globalData.totalCount
    })
  },
  callStore() {
    this.setData({
      showBottomDialog: true
    })
  },
  hiddenBottomDialog() {
    this.setData({
      showBottomDialog: false
    })
  },
  //商品详情
  showFoodDetails(e) {
    this.setData({
      foodDetails: e.currentTarget.dataset.food,
      showFoodDetails: true
    })
  },
  hideFoodDetails() {
    this.setData({
      showFoodDetails: false
    })
  },
  // 购物车
  showCartList() {
    this.setData({
      showCartList: true
    })
  },
  hideCartList() {
    this.setData({
      showCartList: false
    })
  },
  // 删除购物车的商品
  deleteCartListItem(e) {
    const cartFood = app.globalData.cartList.find(item => item.id === e.currentTarget.dataset.food.id)
    let foodInfo = null
    const index = app.globalData.cartList.indexOf(cartFood)

    for(let item of this.data.goodsCategoryList) {
      const a = item.foodsList
      foodInfo = a.find(item => item.id === e.currentTarget.dataset.food.id)
      if(foodInfo) {
        app.globalData.cartList.splice(index, 1)
        app.globalData.totalPrice -= foodInfo.price * foodInfo.num
        app.globalData.totalCount -= foodInfo.num
        foodInfo.num = 0
      }
    }

    this.setData({
      cartList: app.globalData.cartList,
      totalPrice: app.globalData.totalPrice,
      totalCount: app.globalData.totalCount,
      goodsCategoryList: this.data.goodsCategoryList
    })
  },
  // 提示清空购物车
  showDeleteCartTip() {
    wx.showModal({
      title: '提示',
      content: '清除购物车所有内容？',
      success: res => {
        if(res.confirm) {
          this.clearCartList()
        }
      }
    })
  },
  // 清空购物车
  clearCartList() {
    app.globalData.cartList = []
    app.globalData.totalCount = 0
    app.globalData.totalPrice = 0

    // 清空数量
    for(let item of this.data.goodsCategoryList) {
      for(let food of item.foodsList) {
        food.num = 0
      }
    }

    this.setData({
      cartList: app.globalData.cartList,
      totalPrice: app.globalData.totalPrice,
      totalCount: app.globalData.totalCount,
      goodsCategoryList: this.data.goodsCategoryList
    })
  },
  bill() {
    if(this.data.cartList[0]) {
      wx.navigateTo({
        url: '/pages/WCH/bill/bill',
        success: res => {
          res.eventChannel.emit('emitStoreAddress', {storeAddress: this.data.storeAddress})
        }
      })
    }
  }
})