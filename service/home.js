import request from './network'

import {
  BASE_URL,
  H_config
} from './config'

export function getMultiData(data) {
  return request({
    url: H_config.API_getMultiData_URL,
    method: 'post',
    data: data
  })
}

export function getShopDetail(data) {
  return request({
    url: H_config.API_getShopDetails_URL,
    method: 'post',
    data: data
  })
}

// 分页查校区
export function getCampus(data) {
  return request({
    url: H_config.API_getCampus_URL,
    data: data
  })
}

export function getAllCampus() {
  return request({
    url: H_config.API_getAllCampus_URL
  })
}

export function getNotice(data) {
  return request({
    method: 'post',
    url: H_config.API_getNotice_URL,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getAllPosters(data) {
  return request({
    method: 'post',
    url: H_config.API_getAllPosters_URL,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getShopCategory(data) {
  return request({
    url: H_config.API_getShopCategory_URL,
    data: data
  })
}

export function searchTip(data) {
  
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'post',
      url: BASE_URL + H_config.API_autoComplete_URL,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: resolve,
      fail: reject
    })
  })
}
