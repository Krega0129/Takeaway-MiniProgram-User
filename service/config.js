// const BASE_URL = 'http://192.168.1.100:8081'
// const BASE_URL = 'http://175.24.113.119:8081'
// const BASE_URL = 'http://192.168.1.105:8081'
// const BASE_URL = 'http://121.41.229.2:8081'

// KY
// const BASE_URL = 'http://192.168.43.63:8080'
// const BASE_URL = 'http://175.24.113.119:8080'

// DL
const BASE_URL = 'http://192.168.43.63:8080'
// const BASE_URL = 'http://47.93.19.109:1:8080'

const H_config = {}

H_config.LOGIN = '/user/login'
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

// DL
// 获取校区
H_config.GET_CAMPUS = '/campus/selectAllByPage'

// 改成对象
export {
  BASE_URL,
  H_config
}