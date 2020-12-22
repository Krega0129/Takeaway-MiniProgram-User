import { BASE_URL } from './config'

const header = {
  'Content-Type': "application/json"
}

export default async function(options) {
  wx.showLoading({
    title: '加载中...',
  })

  if(options.header) {
    options.header.token = wx.getStorageSync('token') || ''
  } else {
    header.token = wx.getStorageSync('token') || ''
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      method: options.method || 'get',
      url: BASE_URL + options.url,
      data: options.data || {},
      header: options.header || header,
      success: resolve,
      fail: reject
    })
  })
}
