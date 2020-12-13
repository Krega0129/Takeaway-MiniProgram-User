
const BASE_URL = 'http://192.168.1.111:8080'

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
// 获取校区
H_config.GET_CAMPUS = '/campus/selectAllByPage'

// 改成对象
export {
  BASE_URL,
  H_config
}