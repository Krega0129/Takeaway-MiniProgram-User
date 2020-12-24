import request from './network'

import {
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

export function getShopCategory(data) {
  return request({
    url: H_config.API_getShopCategory_URL,
    data: data
  })
}

export function searchTip(data) {
  return request({
    url: H_config.API_autoComplete_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
