import request from './network'
import {
  K_config
} from './config'

// 获取所有校园圈
export function getAllDynamic(pageNum , pageSize ,userId) {
  return request({
    url: K_config.API_getAllDynamic_URL,
    method: 'POST',
    data: {
      pageNum,
      pageSize,
      userId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 根据校区查询校园圈
export function getAllDynamicByCampus(campusName , pageNum , pageSize ,userId) {
  return request({
    url: K_config.API_getAllDynamicByCampus_URL ,
    method: 'POST',
    data: {
      campusName,
      pageNum,
      pageSize,
      userId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 用户点赞
export function giveThunbUp(shareId,userId) {
  return request({
    url: K_config.API_giveThumbUp_URL ,
    method: 'POST',
    data: {
      shareId,
      userId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 用户取消点赞
export function cancelThunbUp(shareId,userId) {
  return request({
    url: K_config.API_cancelThumbUp_URL,
    method: 'POST',
    data: {
      shareId,
      userId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 新增校园圈
export function addDynamic(data) {
  return request({
    url: K_config.API_addDynamic_URL,
    method: 'POST',
    data: data
  })
}

//新增评论
export function insertComment(data) {
  return request({
    url: K_config.API_insertComment_URL,
    method: 'POST',
    data: data
  })
}

//获取评论
export function getComment(pageNum,pageSize,shareId) {
  return request({
    url: K_config.API_getComment_URL,
    method: 'POST',
    data: {
      pageNum,
      pageSize,
      shareId,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 删除评论
export function deleteComment(commentId) {
  return request({
    url: K_config.API_deleteComment_URL,
    method: 'DELETE',
    data: {
      commentId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取历史动态
export function getDynamicById(data) {
  return request({
    url: K_config.API_getDynamicById_URL,
    method: 'POST',
    data:data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 根据状态获取动态
export function getDynamicByStatus(data) {
  return request({
    url: K_config.API_getDynamicByStatus_URL,
    method: 'POST',
    data:data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 删除动态
export function deleteDynamicById(data) {
  return request({
    url: K_config.API_deleteDynamic_URL,
    method: 'DELETE',
    data:data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}