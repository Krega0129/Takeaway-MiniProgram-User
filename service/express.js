import request from './network'

import {
  H_config
} from './config'

export function selectExpressAgentPrice() {
  return request({
    url: H_config.API_selectExpressAgentPrice_URL,
  })
}

export function submitNewForm(data) {
  return request({
    url: H_config.API_submitNewForm_URL,
    method: 'post',
    data: data
  })
}

export function selectUserOrder(data) {
  return request({
    url: H_config.API_selectUserOrder_URL,
    method: 'post',
    data: data
  })
}

export function a(data) {
  return request({
    url: H_config.API_submitNewForm_URL,
    method: 'post',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}