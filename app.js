//app.js
import { showToast } from './service/config'
import  bus  from './utils/bus'
App({
  onLaunch: function () {
    this.globalData.bus=bus
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if(!wx.getStorageSync('searchSchoolHistoryList')) {
      wx.setStorageSync('searchSchoolHistoryList', [])
    }
    if(!wx.getStorageSync('searchFoodHistoryList')) {
      wx.setStorageSync('searchFoodHistoryList', [])
    }

    if(!wx.getStorageSync('address')) {
      wx.redirectTo({
        url: '/pages/WCH/location/location?canback=' + 0
      })
    }
    
    
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    })

    // 获取用户信息
  },
  addToCart(obj, tag, bool) {
    // 1.判断是否已经添加进来
    let old = null
    let oldInfo = null

    // 判断是哪家店铺的购物车
    if(this.globalData.cartList.find((item) => item.shopId === obj.shopId)) {
      old = this.globalData.cartList.find((item) => item.shopId === obj.shopId)
    } else {
      old = {shopId: obj.shopId, foodList:[]}
      this.globalData.cartList.push(old)
    }
    
    // 是否存在规格
    if(tag) {
      oldInfo = old.foodList.find((item) => item.id === obj.id && item.spec === tag)
    } else {
      oldInfo = old.foodList.find((item) => item.id === obj.id)
    }

    // 购物车中存在 && 没有规格 && 不是在详情页加购
    if(oldInfo && !tag && !bool) {
      oldInfo.num++
    } else if(!oldInfo && !tag) {
      // 购物车不存在 && 没有规格
      obj.num = 1
      old.foodList.push(obj)
    } else if (oldInfo && tag && tag === oldInfo.spec) {
      // 购物车中存在 && 有规格 && 购物车中存在此规格商品
      oldInfo.num++
      oldInfo.count++
    } else if(!oldInfo || (oldInfo && tag && tag !== oldInfo.spec)){
      // 购物车中不存在该商品 || 规格
      old.foodList.push({...obj, spec: tag, count: 1})
    }

    if(oldInfo) {
      obj.num = oldInfo.num
    }

    for(let food of old.foodList) {
      if(food.id === obj.id) {
        food.num = obj.num
      }
    }
    this.culPrice(old.foodList);
  },
  culPrice(list, sendPrice) {
    this.globalData.totalPrice = 0
    this.globalData.totalCount = 0
    for(let item of list) {
      const num = item.count ? item.count : item.num
      this.globalData.totalPrice += (item.price + (item.attrPrice ? item.attrPrice : 0)) * num
      this.globalData.totalCount += num
    }
    this.globalData.totalPrice = this.globalData.totalPrice + (sendPrice || 0)
    this.globalData.totalPrice = this.globalData.totalPrice.toFixed(2)
  },

  // login(e) {
  //   if (e.detail.errMsg == "getUserInfo:ok")//判断用户是否授权
  //    {
  //     const encryptedData = e.detail.encryptedData;
  //     const iv = e.detail.iv;
  //     wx.showLoading({
  //       title: '正在登录中...',
  //       icon: 'loading',
  //       mask: true
  //     })
  //     wx.login({ 
  //       success: (res) => {
  //         console.log(encryptedData);
  //         console.log(iv);
          
  //         console.log(res.code);
          
  //         if (res.code) {
  //           const code = res.code;

  //             wx.request({
  //             url: 'http://192.168.1.100:8080/driverinfo/getOpenId', //访问后端,定义对应的url
  //             data: {
  //               encryptedData: encryptedData,
  //               iv: iv,
  //               code: code
  //             },
  //             method: 'POST',
  //             header: {
  //               'Content-Type': 'application/x-www-form-urlencoded'
  //             },
  //             success: (res) => {
  //             //解密成功后 获取自己服务器返回的结果
  //             console.log(res);
  //             this.globalData.openId = res.data.data.openId
  //             this.globalData.sessionKey = res.data.data.sessionKey
  //               // if (res.data.code > 0) {
  //               wx.hideLoading();
  //               //   wx.setStorageSync('token', res.data.userInfo.accessToken);
  //               //   wx.setStorageSync('mid', res.data.userInfo.id);
  //               //   wx.setStorageSync('nickName', res.data.userInfo.nickName);
  //               //   wx.setStorageSync('avatarUrl', res.data.userInfo.avatarUrl);
  //               //   wx.setStorageSync('status', res.data.userInfo.status);
  //               //   wx.reLaunch({//关闭所有页面，打开到应用内的某个页面
  //               //     url: "/pages/WCH/home/home"
  //               //   })
  //               // }else {
  //               //   console.log('解密失败')
  //               // }
  //             },
  //             fail: function(res) {
  //               console.log(res);
  //             }
  //           })
            
  //         }
  //       },
  //       fail: function () {
  //         console.log("启用wx.login函数，失败！");
  //       },
  //     })
  //    }
  // },
  getPhoneNumber(e) {
    console.log(e);
    wx.request({
      url: 'http://192.168.1.100:8080/driverinfo/getPhoneNumber',
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openId: this.globalData.openId,
        sessionKey: this.globalData.sessionKey
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },
  onShow() {
    // this.webSocketConnect()
  },
  globalData: {
    StatusBar: null,
    userInfo: null,
    Custom: null,
    CustomBar: null,
    // 购物车列表
    cartList: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalCount: 0,
    phoneNum: null,
    token: null,
    nowLocation: '广东工业大学'
  },
  webSocketConnect(uid = 12, identity, lastestOrderDate) {
    wx.connectSocket({
      url: 'ws://192.168.1.101:58080/ws',
      timeout: 50000,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('connect',res);
        this.webSocketOpen(uid, identity = 'user', lastestOrderDate)
      },
      fail: (res) => {
      }
    })
  },
  webSendSocketMessage(uid, identity, lastestOrderDate) {
    if(lastestOrderDate){
      wx.sendSocketMessage({
        data: JSON.stringify({
          uid,
          identity,
          lastestOrderDate
        }),
        success: res => {
          console.log('send',res);
          this.webGetSocketMessage()
        }
      })
    }
    else{
      wx.sendSocketMessage({
        data: JSON.stringify({
          uid,
          identity,
        }),
        success: res => {
          console.log('send',res);
          this.webGetSocketMessage()
        }
      })
    }
  },
  webGetSocketMessage() {      
    wx.onSocketMessage((res) => {
    // const a=JSON.parse(res.data)
      console.log('get',res);
      if(res.data!=="服务器连接成功！"){
        // console.log(JSON.parse(res.data));
        let orderMsg=JSON.parse(res.data)
        bus.emit('orderMsg',orderMsg)
        // showToast('订单状态改变', 1000)
      }
    })
  },
  webSocketOpen(uid, identity, lastestOrderDate) {
    wx.onSocketOpen((res) => {
      this.webSendSocketMessage(uid, identity, lastestOrderDate)
    })
  },
  webSocketClose() {
    wx.onSocketClose((result) => { })
  }
})
