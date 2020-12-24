import request from './network'

import {
  H_config,
  K_config
} from './config'

export function getAllAddress(data) {
  return request({
    url: H_config.GET_ALL_ADDRESS,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function updateAddress(data) {
  return request({
    url: H_config.UPDATE_ADDRESS,
    method: 'post',
    data: data
  })
}

export function deleteAddress(data) {
  return request({
    url: H_config.DELETE_ADDRESS,
    data: data
  })
}

export function addNewAddress(data) {
  return request({
    url: H_config.ADD_NEW_ADDRESS,
    method: 'post',
    data: data
  })
}

export function orderNewOrder(data) {
  return request({
    url: H_config.ORDER_NEW_ORDER,
    method: 'post',
    data: data
  })
}

export function cancelOrder(data) {
  return request({
    url: H_config.CANCEL_ORDER,
    data: data, 
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function changeOrderStatus(data) {
  return request({
    url: H_config.CHANGE_ORDER_STATUS,
    data: data,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function addReceiver() {
  return request({
    url: H_config.ADD_RECEIVER,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function oncePaySharing(data) {
  return request({
    url: H_config.ONCE_PAY_SGARING,
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
