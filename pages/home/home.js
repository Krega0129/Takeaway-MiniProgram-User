// pages/home/home.js
const app = getApp()
Page({
  data: {
    position: app.globalData.nowLocation,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    categoryList: [
      {
        title: '美食快餐',
        img: '/assets/img/WCH/category/fast-food.png'
      },
      {
        title: '米粉面馆',
        img: '/assets/img/WCH/category/noodle.png'
      },
      {
        title: '汉堡炸鸡',
        img: '/assets/img/WCH/category/hambur.png'
      },
      {
        title: '奶茶',
        img: '/assets/img/WCH/category/tea-milk.png'
      },
      {
        title: '面包糕点',
        img: '/assets/img/WCH/category/bread.png'
      },
      {
        title: '鲜果',
        img: '/assets/img/WCH/category/fruit.png'
      },
      {
        title: '烧烤夜宵',
        img: '/assets/img/WCH/category/BBQ.png'
      },
      {
        title: '超市商铺',
        img: '/assets/img/WCH/category/shop.png'
      },
    ]
  },
  onShow() {
    this.setData({
      position: app.globalData.nowLocation
    })
  },
  focusSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
