import request from '../service/network'
import {
  BASE_URL,
  H_config
} from '../service/config'
import {
  getMultiData
} from '../service/home'
import {
  prePay,
  changeOrderStatus
} from '../service/bill'

const formatTime = d => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

async function _getMultiData(position, storeList, {pageNum, category, keyWord}) {
  let totalPages = 0
  await getMultiData({
    address: position,
    category: category,
    keyWord: keyWord,
    pageNum: pageNum,
    pageSize: 10
  }).then(res => {
    if(res && res.data && res.data.code === H_config.STATECODE_getMultiData_SUCCESS) {
      const shopList = res.data.data
      if(shopList.list) {
        for(let item of shopList.list) {
          item.shopHead = BASE_URL + '/' + item.shopHead
        }
        storeList.push(...shopList.list)
      }
      totalPages = shopList.totalPages
    } else if(res && res.data && res.data.code === H_config.STATECODE_getMultiData_FAIL) {
      wx.hideLoading()
    } else {
      wx.hideLoading()
      showToast('网络异常！')
    }
  })

  return {storeList, totalPages}
}

function login(data) {
  return request({
    url: H_config.API_login_URL,
    data: data,
    method: 'post'
  })
}

export function loadingOn(loadingContent) {
  wx.showLoading({
    title: loadingContent,
  })
}
export function loadingOff() {
  wx.hideLoading({
    success: (res) => { },
  })
}

export function showToast(showMsg, time) {
  wx.showToast({
    title: showMsg,
    icon: 'none',
    duration: time || 1000
  })
}

export function pay(data) {
  prePay(data).then(res => {
    console.log(res);
    
    if(res && res.data && res.data.code === H_config.STATECODE_prePay_SUCCESS) {
      if (res.data.prepayId != ''){
        const map = res.data.data
        wx.requestPayment({
          'appId': map.appId,
          'timeStamp': map.timeStamp,
          'nonceStr': map.nonceStr,
          'package': map.package,
          'signType': 'MD5',
          'paySign': map.paySign,
          'success':  (res) => {
            if(res.errMsg === 'requestPayment:ok') {
              changeOrderStatus({
                orderNumber: data.orderNumber,
                userId: wx.getStorageSync('userId')
              }).then(res => {
                if(res && res.data && res.data.code === H_config.STATECODE_changeOrderStatus_SUCCESS) {
                  wx.showToast({
                    title: '支付成功！'
                  })
                  wx.setStorageSync('refundTime', new Date().getTime() + 10000)
                  wx.navigateTo({
                    url: '/pages/WCH/submitOrder/submitOrder',
                    success: result => {
                      result.eventChannel.emit('submitOrder', {
                        cartList: this.data.cartList,
                        shopAddress: this.data.storeAddress,
                        user: this.data.user,
                        storeTelNum: this.data.storeTelNum,
                        remark: this.data.remark || '',
                        takeAway: this.data.takeAway,
                        payTime: new Date(),
                        obj: data,
                        isPay: true
                      })
                    }
                  })
                } else {
                  showToast('支付失败！：' + res.data.msg)
                }
              })
            }

            // 分账
            // setTimeout(() => {
            //   oncePaySharing({
            //     deliveryFee: parm.deliveryFee,
            //     orderNumber: parm.orderNumber,
            //     shopName: parm.shopName,
            //     totalAmount: parm.totalAmount
            //   }).then(result => {
            //     console.log(result);
            //   })
            // }, 90000);
          },
          'fail': () => {
            let pages = getCurrentPages()
            const currentPage = pages[pages.length - 1]
            if(currentPage.route && currentPage.route !== 'pages/WCH/submitOrder/submitOrder') {
              wx.navigateTo({
                url: '/pages/WCH/submitOrder/submitOrder',
                success: res => {
                  // 记录时间
                  wx.setStorageSync('time', new Date().getTime() + 900000)
                  res.eventChannel.emit('submitOrder', {
                    cartList: this.data.cartList,
                    shopAddress: this.data.storeAddress,
                    user: this.data.user,
                    storeTelNum: this.data.storeTelNum,
                    remark: this.data.remark || '',
                    takeAway: this.data.takeAway,
                    obj: data,
                    isPay: false
                  })
                }
              })
            } else {
              wx.hideLoading()
            }
          }
        })
      }
    } else {
      showToast('下单失败，请重试！')
    }
  }).catch(err => {
    console.log(err);
  })
}

export function previewImage(urls, index) {
  wx.previewImage({
    urls: urls,
    current: index || urls[0]
  })
}

module.exports = {
  formatTime: formatTime,
  _getMultiData,
  login,
  loadingOn,
  loadingOff,
  showToast,
  pay,
  previewImage
}
