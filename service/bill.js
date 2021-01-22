import request from './network'

import {
  H_config,
  K_config
} from './config'

export function getAllAddress(data) {
  return request({
    url: H_config.API_getAllAddress_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取地址列表
export function getAllAddressByCampus(data){
  return request({
    url: H_config.API_getAllAddressByCampus_URL,
    method:'POST',
    data: data
  })
}

export function updateAddress(data) {
  return request({
    url: H_config.API_updateAddress_URL,
    method: 'post',
    data: data
  })
}

export function updateDefaultAddress(data) {
  return request({
    url: H_config.API_updateDefaultAddress_URL,
    method: 'post',
    data: data
  })
}

export function deleteAddress(data) {
  return request({
    url: H_config.API_deleteAddress_URL,
    data: data
  })
}

export function addNewAddress(data) {
  return request({
    url: H_config.API_addNewAddress_URL,
    method: 'post',
    data: data
  })
}

export function orderNewOrder(data) {
  return request({
    url: H_config.API_orderNewOrder_URL,
    method: 'post',
    data: data
  })
}

export function cancelOrder(data) {
  return request({
    url: H_config.API_cancelUnpaidOrder_URL,
    data: data,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function changeOrderStatus(data) {
  return request({
    url: H_config.API_changeOrderStatus_URL,
    data: data,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function addReceiver() {
  return request({
    url: H_config.API_addReceiver_URL,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function oncePaySharing(data) {
  return request({
    url: H_config.API_oncePaySharing_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function refundOrder(data) {
  return request({
    url: K_config.API_refund_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function prePay(data) {
  return request({
    url: H_config.API_prePay_URL,
    method: 'post',
    data: data,
    // header: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}
