import { BASE_URL } from './config'

const header = {
  'Content-Type': "application/json"
}


export default async function(options) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  if(options.header) {
    options.header.touristToken = wx.getStorageSync('touristToken')
    if(wx.getStorageSync('token')){
      options.header.userToken = wx.getStorageSync('token')
    }
  } else {
    header.touristToken = wx.getStorageSync('touristToken')
    if(wx.getStorageSync('token')){
      header.userToken = wx.getStorageSync('token')
    }
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      method: options.method || 'get',
      url: BASE_URL + options.url,
      data: options.data || {},
      header: options.header || header,
      success: res => {
        if(res.data.code === 400) {
          wx.removeStorageSync('token')
          wx.showToast({
            title: '登录已过期，请重新登录！',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/WCH/login/login',
            })
          }, 1000)
        } else {
          resolve(res)
        }
      },
      fail: reject
    })
  })
}
