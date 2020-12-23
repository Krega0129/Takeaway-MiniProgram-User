import request from './network'

import {
  H_config
} from './config'

export function getMultiData(data) {
  return request({
    url: H_config.GET_MULTI_DATA,
    method: 'post',
    data: data
  })
}

export function getShopDetail(data) {
  return request({
    url: H_config.GET_SHOP_DETAIL,
    method: 'post',
    data: data
  })
}

// 分页查校区
export function getCampus(data) {
  return request({
    url: H_config.GET_CAMPUS,
    data: data
  })
}

export function getAllCampus() {
  return request({
    url: H_config.GET_ALL_COMPUS
  })
}

export function getShopCategory(data) {
  return request({
    url: H_config.GET_SHOP_CATEGORY,
    data: data
  })
}

export function searchTip(data) {
  return request({
    url: H_config.SEARCH,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function test() {
  return request({
    url: '/wechatpay/addReceiver',
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
