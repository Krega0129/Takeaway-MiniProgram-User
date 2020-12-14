import request from '../service/network'
import {
  BASE_URL,
  H_config
} from '../service/config'
import {
  getMultiData
} from '../service/home'

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
    const shopList = res.data.data
    for(let item of shopList.list) {
      item.shopHead = BASE_URL + '/' + item.shopHead
    }
    storeList.push(...shopList.list)
    totalPages = shopList.totalPages
  })

  return {storeList, totalPages}
}

function login(data) {
  return request({
    url: H_config.LOGIN,
    data: data,
    method: 'post'
  })
}

function showMsg(modelName) {
  
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
    duration: time
  })
}

module.exports = {
  formatTime: formatTime,
  _getMultiData,
  login,
  loadingOn,
  loadingOff,
  showToast
}
