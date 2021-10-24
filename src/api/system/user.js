import request from '@/utils/request'
// 获取部门下员工列表,不传部门id查询所有的组织架构
export function deptDeptEmps() {
  return request({
    url: '/system/dept/deptEmps',
    method: 'get',
  })
}
// 同步企业微信组织架构
export function wechatSync() {
  return request({
    url: '/wechat/sync',
    method: 'get',
  })
}
// 保存用户数据
export function userSaveUser(data) {
  return request({
    url: '/user/saveUser',
    method: 'post',
    data:data
  })
}


// 删除职位
export function positionDelete(data) {
  return request({
    url: '/position/delete',
    method: 'post',
    params:data
  })
}

// 修改职位信息
export function positionUpdate(data) {
  return request({
    url: '/position/update',
    method: 'post',
    data:data
  })
}

// 添加职位信息
export function positionAdd(data) {
  return request({
    url: '/position/add',
    method: 'post',
    data:data
  })
}



// 上传图片
export function fileUpload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data:data
  })
}

// 查看部门下的职位信息
export function positionTree(data) {
  return request({
    url: '/position/tree',
    method: 'post',
    data:data
  })
}

// 根据部门id获取用户列表
export function queryDeptUser(data) {
  return request({
    url: '/user/query-dept-user',
    method: 'post',
    data: data
  })
}

// 获取部门下拉树列表
export function deptTreeselect(data) {
  return request({
    url: '/system/dept/treeselect',
    method: 'get',
  })
}


// 离职
export function userResign(data) {
  return request({
    url: '/user/resign',
    method: 'post',
    params:data
  })
}
// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/user/userId?userId='+userId,
    method: 'get',
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/user/saveUser',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/user/saveUser',
    method: 'post',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/user/userIds?userIds=' + userId,
    method: 'post'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId) {
  const data = {
    userId,
  }
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/user/forbidden',
    method: 'post',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(data) {
  // const data = {
  //   oldPassword,
  //   newPassword
  // }
  return request({
    url: '/user/editPwd',
    method: 'post',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/system/user/importTemplate',
    method: 'get'
  })
}
