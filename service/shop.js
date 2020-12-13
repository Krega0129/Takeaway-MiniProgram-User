import request from './network'
import {
  H_config
} from './config'

export function getShopDetail(data) {
  return request({
    url: H_config.GET_SHOP_DETAIL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getShopInfo(data) {
  return request({
    url: H_config.GET_SHOP_INFO,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}