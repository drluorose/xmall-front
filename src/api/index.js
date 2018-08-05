import http from './public'
import domain from './domain.js'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost(domain.productDomain + '/member/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet(domain.productDomain + '/member/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet(domain.productDomain + '/member/checkLogin', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(domain.productDomain + '/member/register', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost(domain.productDomain + '/member/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost(domain.productDomain + '/member/updateheadimage', params)
}
// 捐赠列表
export const thanksList = (params) => {
  return http.fetchGet(domain.productDomain + '/member/thanks', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet(domain.productDomain + '/goods/home', params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchGet(domain.productDomain + '/goods/recommend', params)
}
// 捐赠板块
export const thank = (params) => {
  return http.fetchGet(domain.productDomain + '/goods/thank', params)
}
// 极验验证码
export const geetest = (params) => {
  return http.fetchGet(domain.productDomain + '/member/geetestInit?t=' + (new Date()).getTime(), params)
}

