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