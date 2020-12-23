import request from './network'
import{ 
  K_config
}from './config'

// 获取地址列表
export function getAllAddress(userId){
  return request({
    url: K_config.API_getAllAddress_URL,
    method:'POST',
    header :{
      'content-type': 'application/x-www-form-urlencoded'
    },
    data:{
      userId
    }
  })
}

// 修改地址信息
export function updateAddress(campus,contactName,contactPhone,detailedAddress,isDefault,receiveId,sex,userId){
  return request({
    url: K_config.API_updateAddress_URL,
    method:'POST',
    data:{
      campus,
      contactName,
      contactPhone,
      detailedAddress,
      isDefault,
      receiveId,
      sex,
      userId
    }
  })
}

// 更改默认地址
export function updateAddressStatus(receiveId,addressStatus,userId){
  return request({
    url:K_config.API_updateAddressStatus_URL,
    method:'POST',
    data:{
      receiveId,
      addressStatus,
      userId
    }
  })
}

// 新增地址
export function addNewAddress(campus,contactName,contactPhone,detailedAddress,isDefault,receiveId,sex,userId){
  return request({
    url:K_config.API_addNewAddress_URL,
    method:'POST',
    data:{
      campus,
      contactName,
      contactPhone,
      detailedAddress,
      isDefault,
      receiveId,
      sex,
      userId
    } 
  })
}

// 删除地址
export function deleteAddress(receiveId,userId ){
  return request({
    url:K_config.API_deleteAddress_URL,
    method:'GET',
    data:{
      receiveId,
      userId 
    }
  })
}

// 获取校区信息
export function selectAllCampusName(){
  return request({
    url:K_config.API_selectAllCampus_URL,
    method:'GET'
  })
}