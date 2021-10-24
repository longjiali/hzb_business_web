import request from '@/utils/request'

// 登录方法
export function login(account, password, sign) {
  const data = {
    account,
    password,
    sign
  }
  return request({
    url: '/user/userLogin',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/user/logOut',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
//获取用户列表
export function listUser(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data: data
  })
}

// 查询字典类型列表
export function listType(data) {
  return request({
    url: '/dictionary/list',
    method: 'post',
    data: data
  })
}


export const loginApi = {
  login,
  listUser,
  getInfo,
  logout,
  getCodeImg,
  listType
}
