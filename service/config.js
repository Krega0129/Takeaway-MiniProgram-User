
// const BASE_URL = 'https://192.168.1.102:8888'
// const BASE_URL = 'http://121.41.229.2:8082'
const BASE_URL = 'https://www.lizeqiang.top:8888'

const H_config = {}
// 登录
H_config.LOGIN = '/user/login'
// 搜索提示
H_config.SEARCH = '/getShopInfo/autoComplete'

// 首页
// 获取首页商铺列表
H_config.GET_MULTI_DATA = '/getShopInfo/userGetShop'

// 商铺页面
// 获取店铺详情：商品信息等
H_config.GET_SHOP_DETAIL = '/getCommodityInfo/shopIdGetCommodityUser'
// 获取店铺信息
H_config.GET_SHOP_INFO = '/getShopInfo/shopIdGetShop'
// 获取店铺分类信息
H_config.GET_SHOP_CATEGORY = '/getShopInfo/getShopCategory'

// 订单页面
// 获取收货地址列表
H_config.GET_ALL_ADDRESS = '/address/getAllAddress'
// 修改收获地址
H_config.UPDATE_ADDRESS = '/address/updateAddress'
// 删除收货地址
H_config.DELETE_ADDRESS = '/address/deleteAddress'
// 新增收货地址
H_config.ADD_NEW_ADDRESS = '/address/addNewAddress'

// 提交新订单
H_config.ORDER_NEW_ORDER = '/order/orderNewOrder'
// 取消未支付订单
H_config.CANCEL_ORDER = '/order/cancelUnpaidOrder'
// 修改订单状态
H_config.CHANGE_ORDER_STATUS = '/order/payForOrder'

// DL
// 分页获取校区
H_config.GET_CAMPUS = '/campus/selectAllByPage'
// 获取全部校区
H_config.GET_ALL_COMPUS = '/campus/selectAll'

// 单次请求分账
H_config.ONCE_PAY_SGARING = '/wechatpay/oncePaySharing'
// 添加分帐方
H_config.ADD_RECEIVER = '/wechatpay/addReceiver'

const K_config = {}

K_config.STATECODE_SUCCESS = 200
K_config.STATECODE_getUserOrderByStatus_SUCCESS = 3203
K_config.STATECODE_getUnpaidOrder_SUCCESS = 3203
K_config.STATECODE_cancelUnpaidOrder_SUCCESS = 3204
K_config.STATECODE_selectUserPaidOrder_SUCCESS = 3205


K_config.STATECODE_updateAddress_SUCCESS = 3258
K_config.STATECODE_updateAddress_FALSE = 3552
K_config.STATECODE_updateAddressStatus_SUCCESS = 3255
K_config.STATECODE_addNewAddress_SUCCESS = 3254
K_config.STATECODE_addNewAddress_FALSE = 3551
K_config.STATECODE_deleteAddress_SUCCESS = 3257
K_config.STATECODE_selectAllCampus_SUCCESS = 3200

// 订单接口
K_config.API_selectUserTotalOrder_URL = '/order/selectUserTotalOrder'
K_config.API_getUnpaidOrder_URL = '/order/getUnpaidOrder'
K_config.API_cancelUnpaidOrder_URL = '/order/cancelUnpaidOrder'
K_config.API_selectUserPaidOrder_URL = '/order/selectUserPaidOrder'
K_config.API_payForOrder_URL = '/order/payForOrder'

// 地址接口
K_config.API_getAllAddress_URL = '/address/getAllAddress'
K_config.API_updateAddress_URL = '/address/updateAddress'
K_config.API_addNewAddress_URL = '/address/addNewAddress'
K_config.API_updateAddressStatus_URL = '/address/updateAddressStatus'
K_config.API_deleteAddress_URL = '/address/deleteAddress'
K_config.API_selectAllCampus_URL = '/campus/selectAllCampusName'

// 改成对象
export {
  BASE_URL,
  H_config,
  K_config
}
