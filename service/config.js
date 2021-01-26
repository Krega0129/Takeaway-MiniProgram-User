// const BASE_URL = 'https://192.168.1.105:8888'
// const BASE_URL = 'https://172.20.10.3:8888'
const BASE_URL = 'https://www.lizeqiang.top:8888'
// const BASE_URL = 'https://longdongwu.free.idcfengye.com'

const H_config = {}
H_config.STATECODE_SUCCESS = 200

// 登录
H_config.API_login_URL = '/user/login'
// 搜索提示
H_config.API_autoComplete_URL = '/getShopInfo/autoComplete'
H_config.STATECODE_autoComplete_SUCCESS = 1200

// 首页
// 获取首页商铺列表
H_config.API_getMultiData_URL = '/getShopInfo/userGetShop'
H_config.STATECODE_getMultiData_SUCCESS = 1200
H_config.STATECODE_getMultiData_FAIL = 1201

// 商铺页面
// 获取店铺详情：商品信息等
H_config.API_getShopDetails_URL = '/getCommodityInfo/shopIdGetCommodityUser'
H_config.STATECODE_getShopDetails_SUCCESS = 1200
// 获取店铺信息
H_config.API_getShopInfo_URL = '/getShopInfo/shopIdGetShop'
H_config.STATECODE_getShopInfo_SUCCESS = 1200
// 获取店铺分类信息
H_config.API_getShopCategory_URL = '/getShopInfo/getShopCategory'
H_config.STATECODE_getShopCategory_SUCCESS = 1200
H_config.API_shopIdGetShopLicense_URL = '/getShopInfo/shopIdGetShopLicense'
// 获取轮播图
H_config.API_getAllPosters_URL = '/managerInfo/selectPhotos'
H_config.STATECODE_getAllPosters_SUCCESS = 1200

// 订单页面
// 获取收货地址列表
H_config.API_getAllAddress_URL = '/address/getAllAddress'
H_config.STATECODE_getAllAddress_SUCCESS = 3256
H_config.API_getAllAddressByCampus_URL = '/address/selectAddressByCampus'
// 修改收获地址
H_config.API_updateAddress_URL = '/address/updateAddress'
H_config.STATECODE_updateAddress_SUCCESS = 3258
H_config.STATECODE_updateAddress_FAIL = 3552
// 修改地址默认状态
H_config.API_updateDefaultAddress_URL = '/address/updateAddressStatus'
H_config.STATECODE_updateDefaultAddress_SUCCESS = 3255
// 删除收货地址
H_config.API_deleteAddress_URL = '/address/deleteAddress'
H_config.STATECODE_deleteAddress_SUCCESS = 3257
// 新增收货地址
H_config.API_addNewAddress_URL = '/address/addNewAddress'
H_config.STATECODE_addNewAddress_SUCCESS = 3254
H_config.STATECODE_addNewAddress_FAIL = 3551

// 提交新订单
H_config.API_orderNewOrder_URL = '/order/orderNewOrder'
H_config.STATECODE_orderNewOrder_SUCCESS = 3201
// 取消未支付订单
H_config.API_cancelUnpaidOrder_URL = '/order/cancelUnpaidOrder'
H_config.STATECODE_cancelUnpaidOrder_SUCCESS = 3204
// 修改订单状态
H_config.API_changeOrderStatus_URL = '/order/payForOrder'
H_config.STATECODE_changeOrderStatus_SUCCESS = 3202

// 分页获取校区
H_config.API_getCampus_URL = '/campus/selectAllByPage'
H_config.STATECODE_getCampus_SUCCESS = 3200
// 获取全部校区
H_config.API_getAllCampus_URL = '/campus/selectAll'
H_config.STATECODE_getAllCampus_SUCCESS = 3200

// 支付
H_config.API_prePay_URL = '/wechatpay/prePay'
H_config.STATECODE_prePay_SUCCESS = 3200
H_config.STATECODE_prePay_FAIL = 2530
// 单次请求分账
H_config.API_oncePaySharing_URL = '/wechatpay/oncePaySharing'
// 添加分帐方
H_config.API_addReceiver_URL = '/wechatpay/addReceiver'

const K_config = {}

K_config.STATECODE_SUCCESS = 200
K_config.STATECODE_getUserOrderByStatus_SUCCESS = 3203
K_config.STATECODE_getUnpaidOrder_SUCCESS = 3203
K_config.STATECODE_cancelUnpaidOrder_SUCCESS = 3204
K_config.STATECODE_selectUserPaidOrder_SUCCESS = 3205
K_config.STATECODE_refund_SUCCESS = 3200
K_config.STATECODE_updateOrderStatus_SUCCESS = 3255


K_config.STATECODE_updateAddress_SUCCESS = 3258
K_config.STATECODE_updateAddress_FALSE = 3552
K_config.STATECODE_updateAddressStatus_SUCCESS = 3255
K_config.STATECODE_addNewAddress_SUCCESS = 3254
K_config.STATECODE_addNewAddress_FALSE = 3551
K_config.STATECODE_deleteAddress_SUCCESS = 3257
K_config.STATECODE_selectAllCampus_SUCCESS = 3200

K_config.STATECODE_selectUserInfo_SUCCESS = 3208
K_config.STATECODE_updateUserInfo_SUCCESS = 3253
// 订单接口
K_config.API_selectUserTotalOrder_URL = '/order/selectUserTotalOrder'
K_config.API_getUnpaidOrder_URL = '/order/getUnpaidOrder'
K_config.API_cancelUnpaidOrder_URL = '/order/cancelUnpaidOrder'
K_config.API_selectUserPaidOrder_URL = '/order/selectUserPaidOrder'
K_config.API_payForOrder_URL = '/order/payForOrder'
K_config.API_refund_URL = '/wechatpay/refund'
K_config.API_updateOrderStatus_URL = '/order/updateOrderStatus'


// 地址接口
K_config.API_getAllAddress_URL = '/address/getAllAddress'
K_config.API_updateAddress_URL = '/address/updateAddress'
K_config.API_addNewAddress_URL = '/address/addNewAddress'
K_config.API_updateAddressStatus_URL = '/address/updateAddressStatus'
K_config.API_deleteAddress_URL = '/address/deleteAddress'
K_config.API_selectAllCampus_URL = '/campus/selectAllCampusName'

// 分享校园接口

// 用户信息接口
// 获取信息
K_config.API_selectUserInfo_URL = '/user/selectUserInfo'
// 修改信息
K_config.API_updateUserInfo_URL = '/user/updateUserInfo'
// 上传图片
K_config.API_updatePhoto_URL = '/modifyShopInfo/updatePhoto'

// 改成对象
export {
  BASE_URL,
  H_config,
  K_config
}
