import request from './network'
import {
  H_config
} from './config'

export function getShopDetail(data) {
  return request({
    url: H_config.API_getShopDetails_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getShopInfo(data) {
  return request({
    url: H_config.API_getShopInfo_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function shopIdGetShopLicense(data) {
  return request({
    url: H_config.API_shopIdGetShopLicense_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}