import { BASE_URL } from './config'

const header = {
  'Content-Type': "application/json"
}

export default function(options) {
  wx.showLoading({
    title: '加载中...',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      method: options.method || 'get',
      url: BASE_URL + options.url,
      data: options.data || {},
      header: options.header || header,
      success: resolve,
      fail: reject,
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}
