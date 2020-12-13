import {
  loadingOn,
  loadingOff,
  showToast,
  BASE_URL
} from './config'

const header = {
  'content-type': 'application/json'
}

export default function (options) {
  return new Promise((resolve, reject) => {
    loadingOn('加载中')
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'get',
      header: options.header || header,
      data: options.data || {},
      timeout: 10000,
      success: resolve,
      fail: reject
    })
  }).catch(() => {
    loadingOff()
    showToast('信息显示异常', 1000)
  })
}