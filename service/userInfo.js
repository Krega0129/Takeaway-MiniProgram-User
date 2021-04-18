import request from './network'
import {
  K_config
} from './config'

// 获取用户信息
export function selectUserInfo(userId) {
  return request({
    url: K_config.API_selectUserInfo_URL,
    method: 'GET',
    data: {
      userId
    }
  })
}

// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: K_config.API_updateUserInfo_URL,
    method: 'POST',
    data: data
  })
}

// 上传图片
export function updatePhoto(data) {
  return request({
    url: K_config.API_updatePhoto_URL,
    method: 'POST',
    header: {
      'Content-Type': "multipart/form-data" 
    },
    data: data
  })
}

// 用户提交投诉
export function commitAdvise(data) {
  return request({
    url: K_config.API_commitAdvise_URL,
    method: 'POST', 
    data: data,
    header: {
      'Content-Type': "application/x-www-form-urlencoded" 
    },
  })
}

// 获取入驻提示
export function getTip(data) {
  return request({
    url: K_config.API_getTip_URL,
    method: 'POST', 
    data: data,
    header: {
      'Content-Type': "application/x-www-form-urlencoded" 
    },
  })
}