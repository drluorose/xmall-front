import http from './public'
import domain from './domain'
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet(domain.proecutDomain + '/goods/allGoods', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/cartList', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/addCart', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/delCart', params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/delCartChecked', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/cartEdit', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/cartDel', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/updateAddress', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/addAddress', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/delAddress', params)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/addOrder', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet(domain + '/member/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet(domain.proecutDomain + '/member/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost(domain.proecutDomain + '/member/cancelOrder', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet(domain.proecutDomain + '/goods/productDet', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet(domain.proecutDomain + '/member/delOrder', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet(domain.proecutDomain + '/goods/search', params)
}
// 快速搜索
export const getQuickSearch = (key) => {
  return http.fetchQuickSearch(domain.searchDomain + `/item/itemList/_search?q=productName: ${key}`)
}
