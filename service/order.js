import request from './network'
import {
  K_config
} from './config'

// 获取全部订单
export function getUserTotalOrder(pageNum, size, userId) {
  return request({
    url: K_config.API_selectUserTotalOrder_URL,
    method: 'POST',
    data: {
      pageNum,
      size,
      userId
    }
  })
}

// 获取未付款订单
export function getUnpaidOrder(userId) {
  return request({
    url: K_config.API_getUnpaidOrder_URL,
    method: 'GET',
    data: {
      userId
    }
  })
}

// 取消订单
export function cancelUnpaidOrder(orderNumber) {
  return request({
    url: K_config.API_cancelUnpaidOrder_URL,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      orderNumber
    }
  })
}

// 获取已付款订单
export function selectUserPaidOrder(userId) {
  return request({
    url: K_config.API_selectUserPaidOrder_URL,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data:{
      userId
    }
  })
}

// 支付订单
export function payForOrder() {
  return request({
    url: K_config.API_payForOrder_URL,
    method: 'GET'
  })
}

export function updateOrderStatus(data) {
  return request({
    url: K_config.API_updateOrderStatus_URL,
    method: 'POST',
    data
  })
}