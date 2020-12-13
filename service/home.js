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

export function getCampus(data) {
  return request({
    url: H_config.GET_CAMPUS,
    data: data
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
