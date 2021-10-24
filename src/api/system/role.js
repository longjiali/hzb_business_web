import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/role/list',
    method: 'post',
    data: query
  })
}
// 查询角色详细
export function getRoleDetail(roleId) {
  return request({
    url: '/roleId?roleId=' + roleId,
    method: 'get'
  })
}
// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/role/roleId?roleId=' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/role/saveRole',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/role/saveRole',
    method: 'post',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/role/changeStatus',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/role/deleteRole/roleIds?roleIds=' + roleId,
    method: 'post'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/role/export',
    method: 'get',
    params: query
  })
}

// 查询所有角色
//
export function queryRoleAll(query) {
  return request({
    url: '/role/selectRoleAll',
    method: 'post',
    // params: query
  })
}
