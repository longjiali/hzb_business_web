import request from '@/utils/request'

// 查询字典类型列表
export function listType(data) {
  return request({
    url: '/dictionary/list',
    method: 'post',
    data: data
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/dictionary/dictId?dictId=' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/dictionary/addDictionary',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/dictionary/updateDictType',
    method: 'post',
    data: data
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: '/dictionary/dictIds?dictIds=' + dictId,
    method: 'post'
  })
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: '/dictionary/clearCache',
    method: 'post'
  })
}

// 导出字典类型
export function exportType(query) {
  return request({
    url: '/system/dict/type/export',
    method: 'get',
    params: query
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/dictionary/optionselect',
    method: 'get'
  })
}