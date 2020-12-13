import request from './network'
import {
  API_selectUserTotalOrder_URL,
  API_getUnpaidOrder_URL,
  API_cancelUnpaidOrder_URL,
  API_selectUserPaidOrder_URL,
  API_payForOrder_URL,
} from './config'

// 获取全部订单
export function getUserTotalOrder(pageNum, size, userId) {
  return request({
    url: API_selectUserTotalOrder_URL,
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
    url: API_getUnpaidOrder_URL,
    method: 'GET',
    data: {
      userId
    }
  })
}

// 取消订单
export function cancelUnpaidOrder(orderNumber) {
  return request({
    url: API_cancelUnpaidOrder_URL,
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
    url: API_selectUserPaidOrder_URL,
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
    url: API_payForOrder_URL,
    method: 'GET'
  })
}