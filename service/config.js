export function loadingOn(loadingContent) {
  wx.showLoading({
    title: loadingContent,
  })
}
export function loadingOff() {
  wx.hideLoading({
    success: (res) => { },
  })
}

export function showToast(showMsg, time) {
  wx.showToast({
    title: showMsg,
    icon: 'none',
    duration: time
  })
}

// export const BASE_URL='http://175.24.113.119:8080'
export const BASE_URL = 'http://192.168.1.111:8080'
// export const BASE_URL='http://192.168.43.71:8080'


export const STATECODE_SUCCESS = 200
export const STATECODE_getUserOrderByStatus_SUCCESS = 3203
export const STATECODE_getUnpaidOrder_SUCCESS = 3203
export const STATECODE_cancelUnpaidOrder_SUCCESS = 3204
export const STATECODE_selectUserPaidOrder_SUCCESS = 3205




export const STATECODE_updateAddress_SUCCESS = 3258
export const STATECODE_updateAddress_FALSE = 3552
export const STATECODE_updateAddressStatus_SUCCESS = 3255
export const STATECODE_addNewAddress_SUCCESS = 3254
export const STATECODE_addNewAddress_FALSE = 3551
export const STATECODE_deleteAddress_SUCCESS = 3257
export const STATECODE_selectAllCampus_SUCCESS = 2213








// 订单接口
export const API_selectUserTotalOrder_URL = '/order/selectUserTotalOrder'
export const API_getUnpaidOrder_URL = '/order/getUnpaidOrder'
export const API_cancelUnpaidOrder_URL = '/order/cancelUnpaidOrder'
export const API_selectUserPaidOrder_URL = '/order/selectUserPaidOrder'
export const API_payForOrder_URL = '/order/payForOrder'


// 地址接口
export const API_getAllAddress_URL = '/address/getAllAddress'
export const API_updateAddress_URL = '/address/updateAddress'
export const API_addNewAddress_URL = '/address/addNewAddress'
export const API_updateAddressStatus_URL = '/address/updateAddressStatus'
export const API_deleteAddress_URL = '/address/deleteAddress'
export const API_selectAllCampus = '/campus/selectAll'



